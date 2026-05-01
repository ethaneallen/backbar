/* Backbar — bartender study PWA, v2 */
(() => {
  "use strict";
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ── STORAGE ───────────────────────────────────────────────
  const STORAGE_KEY = "backbar:v1";
  const DEFAULT_STATE = {
    theme: "dark",           // dark | light | dim
    accent: "gold",          // gold | copper | emerald | crimson | cobalt
    haptics: true,
    priceMultiplier: 1.0,    // for cost calc
    drinkCards: {},          // { [name]: { box: 1-5, lastSeen: ts, correct: n, total: n } }
    inventory: [],           // spirits the user has on hand
    scoreboard: { bestSpeed: 0, totalQuizzes: 0 },
  };
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch { return { ...DEFAULT_STATE }; }
  }
  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(persist)); } catch {}
  }
  const persist = loadState();

  // Transient (not saved)
  const state = {
    view: "browse",
    category: "All",
    search: "",
    quizMode: "ingredients",  // ingredients | guess
    quizScope: "all",
    quizCurrent: null,
    quizRevealed: false,
    quizStats: { correct: 0, total: 0 },
    speed: null,
    speedTimer: null,
  };

  // ── UTILS ─────────────────────────────────────────────────
  function esc(s) {
    return String(s ?? "").replace(/[&<>"']/g, c => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }
  function haptic(ms = 12) {
    if (persist.haptics && "vibrate" in navigator) navigator.vibrate(ms);
  }
  function toast(msg, ms = 1600) {
    const t = $("#toast");
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => t.hidden = true, ms);
  }
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", persist.theme);
    document.documentElement.setAttribute("data-accent", persist.accent);
    const meta = document.querySelector('meta[name="theme-color"]');
    const bg = getComputedStyle(document.documentElement).getPropertyValue("--bg").trim();
    if (meta && bg) meta.setAttribute("content", bg);
  }

  // ── NAV / DRAWER ──────────────────────────────────────────
  function setView(name) {
    state.view = name;
    $$(".view").forEach(v => v.classList.toggle("active", v.id === `view-${name}`));
    $$(".drawer-item").forEach(i => i.classList.toggle("active", i.dataset.view === name));
    closeDrawer();
    window.scrollTo(0, 0);
    const renderer = viewRenderers[name];
    if (renderer) renderer();
  }
  function openDrawer()  { $("#drawer").classList.add("open"); $("#drawer-backdrop").classList.add("open"); }
  function closeDrawer() { $("#drawer").classList.remove("open"); $("#drawer-backdrop").classList.remove("open"); }

  $("#menu-btn").addEventListener("click", openDrawer);
  $("#drawer-backdrop").addEventListener("click", closeDrawer);
  $$(".drawer-item").forEach(btn => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });
  $("#theme-btn").addEventListener("click", () => {
    const order = ["dark", "dim", "light"];
    const i = order.indexOf(persist.theme);
    persist.theme = order[(i + 1) % order.length];
    applyTheme(); saveState();
    toast(`Theme: ${persist.theme}`);
  });
  $("#shift-btn").addEventListener("click", () => setView("shift"));

  // ── CATEGORIES ────────────────────────────────────────────
  function allCategories() {
    return ["All", ...new Set(DRINKS.map(d => d.category))];
  }
  function allSpirits() {
    return [...new Set(DRINKS.map(d => d.spirit))].sort();
  }
  function allFlavors() {
    const set = new Set();
    DRINKS.forEach(d => (d.tags || []).forEach(t => set.add(t)));
    return [...set].sort();
  }

  // ── DRINK CARD STATE (spaced rep) ─────────────────────────
  // Leitner 5-box. box 1 = daily, 5 = mastered.
  const BOX_INTERVAL_MS = [
    0,                    // 0 - unseen
    0,                    // 1 - right away
    12 * 60 * 60 * 1000,  // 2 - 12h
    3  * 24 * 60 * 60 * 1000,   // 3 - 3d
    7  * 24 * 60 * 60 * 1000,   // 4 - 1w
    21 * 24 * 60 * 60 * 1000,   // 5 - 3w
  ];
  function getCard(name) {
    if (!persist.drinkCards[name]) {
      persist.drinkCards[name] = { box: 1, lastSeen: 0, correct: 0, total: 0 };
    }
    return persist.drinkCards[name];
  }
  function cardStatus(name) {
    const c = persist.drinkCards[name];
    if (!c || c.total === 0) return "new";
    if (c.box >= 4) return "mastered";
    return "learning";
  }
  function markCorrect(name) {
    const c = getCard(name);
    c.box = Math.min(5, c.box + 1);
    c.correct++; c.total++; c.lastSeen = Date.now();
    saveState();
  }
  function markMissed(name) {
    const c = getCard(name);
    c.box = 1;
    c.total++; c.lastSeen = Date.now();
    saveState();
  }
  function pickSpacedDrink(pool) {
    if (!pool.length) return null;
    const now = Date.now();
    // Score each drink — smaller is higher priority
    const scored = pool.map(d => {
      const c = persist.drinkCards[d.name];
      if (!c || c.total === 0) return { d, score: -1000 }; // brand new = top
      const box = c.box || 1;
      const interval = BOX_INTERVAL_MS[box] || 0;
      const due = (c.lastSeen + interval) - now;
      return { d, score: due };
    });
    scored.sort((a, b) => a.score - b.score);
    // Pick from top 5 for variety
    const top = scored.slice(0, Math.min(5, scored.length));
    const pick = top[Math.floor(Math.random() * top.length)].d;
    return pick;
  }

  // ── TOAST / CLEAR PROGRESS ────────────────────────────────
  function resetProgress() {
    persist.drinkCards = {};
    persist.scoreboard = { bestSpeed: 0, totalQuizzes: 0 };
    saveState();
    toast("Progress reset");
  }

  // ── RENDERERS DISPATCH ────────────────────────────────────
  const viewRenderers = {};

  // expose for other modules
  window.__BB = { state, persist, saveState, toast, haptic, setView, getCard,
                  cardStatus, markCorrect, markMissed, pickSpacedDrink,
                  allCategories, allSpirits, allFlavors, viewRenderers, resetProgress };

  // ── INIT ──────────────────────────────────────────────────
  applyTheme();
  document.addEventListener("DOMContentLoaded", () => {
    // (runs after all modules attach renderers)
  });
  // Boot after scripts load
  requestAnimationFrame(() => {
    Object.values(viewRenderers).forEach(fn => fn && fn.init && fn.init());
    if (viewRenderers.browse) viewRenderers.browse();
  });
})();
