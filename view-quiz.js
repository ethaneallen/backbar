/* Spaced-repetition quiz with swipe gestures */
(() => {
  const BB = window.__BB;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function populateScope() {
    const sel = $("#quiz-scope");
    sel.innerHTML = '<option value="all">All drinks</option>';
    BB.allCategories().filter(c => c !== "All").forEach(cat => {
      const o = document.createElement("option");
      o.value = cat; o.textContent = cat;
      sel.appendChild(o);
    });
  }
  $("#quiz-scope").addEventListener("change", e => {
    BB.state.quizScope = e.target.value;
    nextQuiz();
  });
  $$(".quiz-modes .mode").forEach(btn => {
    btn.addEventListener("click", () => {
      $$(".quiz-modes .mode").forEach(b => b.classList.toggle("active", b === btn));
      BB.state.quizMode = btn.dataset.mode;
      nextQuiz();
    });
  });

  function pool() {
    if (BB.state.quizScope === "all") return DRINKS;
    return DRINKS.filter(d => d.category === BB.state.quizScope);
  }

  function nextQuiz() {
    const p = pool();
    let pick = BB.pickSpacedDrink(p);
    if (pool().length > 1 && pick === BB.state.quizCurrent) {
      pick = BB.pickSpacedDrink(p.filter(d => d !== BB.state.quizCurrent));
    }
    BB.state.quizCurrent = pick;
    BB.state.quizRevealed = false;
    renderQuiz();
  }

  function renderQuiz() {
    const card = $("#quiz-card");
    const d = BB.state.quizCurrent;
    if (!d) { card.innerHTML = ""; return; }

    const isGuess = BB.state.quizMode === "guess";
    const promptLabel = isGuess ? "Name this drink" : "Recipe for";
    const promptBody = isGuess
      ? `${d.ingredients.map(i => `${i.amount} ${i.item}`).join(" · ")}<br><span style="color:var(--muted);font-size:13px;font-weight:400">${esc(d.method)} · ${esc(d.glass)}</span>`
      : esc(d.name);

    const status = BB.cardStatus(d.name);
    const c = BB.persist.drinkCards[d.name];
    const boxIndicator = c ? `Box ${c.box}/5` : "New";

    let answerHtml;
    if (!BB.state.quizRevealed) {
      answerHtml = `<div class="quiz-hidden">Think it through, then tap Reveal (or swipe).</div>`;
    } else if (isGuess) {
      answerHtml = `
        <div style="font-size:20px;font-weight:700;color:var(--accent-2);margin-bottom:8px">${esc(d.name)}</div>
        ${d.note ? `<div class="note">${esc(d.note)}</div>` : ""}
      `;
    } else {
      answerHtml = `
        <div style="margin-bottom:8px;font-size:13px;color:var(--muted)">${esc(d.method)} · ${esc(d.glass)} · garnish ${esc(d.garnish)}</div>
        <ul class="ingredients">
          ${d.ingredients.map(i => `<li><span>${esc(i.item)}</span><span class="amount">${esc(i.amount)}</span></li>`).join("")}
        </ul>
      `;
    }

    const actions = BB.state.quizRevealed
      ? `
        <button class="btn bad" id="q-bad">Missed it</button>
        <button class="btn good" id="q-good">Got it</button>
        <button class="btn" id="q-detail">Full recipe</button>
      `
      : `<button class="btn primary" id="q-reveal">Reveal</button>`;

    card.innerHTML = `
      <div class="quiz-prompt-label">${promptLabel} · <span style="color:var(--accent-2)">${boxIndicator}</span> · <span class="tag" style="margin:0">${status}</span></div>
      <div class="quiz-prompt">${promptBody}</div>
      <div class="quiz-answer">${answerHtml}</div>
      <div class="quiz-actions">${actions}</div>
    `;

    const reveal = $("#q-reveal");
    if (reveal) reveal.addEventListener("click", () => { BB.state.quizRevealed = true; BB.haptic(8); renderQuiz(); });
    const good = $("#q-good");
    if (good) good.addEventListener("click", () => { gotIt(); });
    const bad = $("#q-bad");
    if (bad) bad.addEventListener("click", () => { missedIt(); });
    const dbtn = $("#q-detail");
    if (dbtn) dbtn.addEventListener("click", () => BB.openDetail(d));

    attachSwipe(card);
    renderStats();
  }

  function gotIt() {
    BB.markCorrect(BB.state.quizCurrent.name);
    BB.state.quizStats.correct++;
    BB.state.quizStats.total++;
    BB.haptic(15);
    animateAndNext("swipe-right");
  }
  function missedIt() {
    BB.markMissed(BB.state.quizCurrent.name);
    BB.state.quizStats.total++;
    BB.haptic([15,40,15]);
    animateAndNext("swipe-left");
  }
  function animateAndNext(cls) {
    const card = $("#quiz-card");
    card.classList.add(cls);
    setTimeout(() => {
      card.classList.remove(cls);
      nextQuiz();
    }, 220);
  }

  // ── swipe ──
  function attachSwipe(el) {
    let startX = 0, startY = 0, dx = 0, dy = 0, tracking = false;
    el.ontouchstart = e => {
      if (!BB.state.quizRevealed) return;
      const t = e.touches[0];
      startX = t.clientX; startY = t.clientY; dx = 0; dy = 0; tracking = true;
    };
    el.ontouchmove = e => {
      if (!tracking) return;
      const t = e.touches[0];
      dx = t.clientX - startX;
      dy = t.clientY - startY;
      if (Math.abs(dx) > 10) {
        el.style.transform = `translateX(${dx}px) rotate(${dx/30}deg)`;
        el.style.opacity = String(Math.max(0.4, 1 - Math.abs(dx)/400));
      }
    };
    el.ontouchend = () => {
      if (!tracking) return;
      tracking = false;
      el.style.transform = ""; el.style.opacity = "";
      if (Math.abs(dx) > 100 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) gotIt(); else missedIt();
      }
    };
  }

  function renderStats() {
    const s = BB.state.quizStats;
    const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
    $("#quiz-stats").textContent = s.total
      ? `${s.correct} / ${s.total} correct (${pct}%) · Swipe right = got it, left = missed`
      : "No answers yet — reveal and rate yourself honestly. Swipe or tap.";
  }

  BB.viewRenderers.quiz = function quiz() {
    populateScope();
    if (!BB.state.quizCurrent) nextQuiz();
    else renderQuiz();
  };
})();
