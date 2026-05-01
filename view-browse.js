/* Browse drinks view + detail modal with variations */
(() => {
  const BB = window.__BB;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function renderChips() {
    const row = $("#category-chips");
    row.innerHTML = "";
    BB.allCategories().forEach(cat => {
      const chip = document.createElement("button");
      chip.className = "chip" + (cat === BB.state.category ? " active" : "");
      chip.textContent = cat;
      chip.addEventListener("click", () => {
        BB.state.category = cat;
        BB.haptic(8);
        renderChips(); renderGrid();
      });
      row.appendChild(chip);
    });
  }

  function filteredDrinks() {
    const q = BB.state.search.trim().toLowerCase();
    return DRINKS.filter(d => {
      if (BB.state.category !== "All" && d.category !== BB.state.category) return false;
      if (!q) return true;
      const hay = [
        d.name, d.category, d.spirit, d.glass, d.method,
        ...(d.ingredients || []).map(i => i.item),
        ...(d.tags || []),
      ].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }

  function renderGrid() {
    const grid = $("#drink-grid");
    const empty = $("#empty-state");
    const drinks = filteredDrinks();
    grid.innerHTML = "";
    empty.hidden = drinks.length > 0;
    drinks.forEach(d => {
      const status = BB.cardStatus(d.name);
      const card = document.createElement("button");
      card.className = "drink-card";
      card.innerHTML = `
        <span class="status-dot ${status}" title="${status}"></span>
        <div class="name">${esc(d.name)}</div>
        <div class="meta">${esc(d.glass)} · ${esc(d.method)}</div>
        <div class="spirit-tag">${esc(d.spirit)}</div>
      `;
      card.addEventListener("click", () => openDetail(d));
      grid.appendChild(card);
    });
  }

  // ── Detail modal ──
  const modal = $("#detail-modal");
  function openDetail(d) {
    const c = $("#detail-content");
    const family = d.family;
    const siblings = family ? DRINKS.filter(x => x.family === family && x.name !== d.name) : [];
    const tagsHtml = (d.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    const costPerPour = (d.cost || 0) * (BB.persist.priceMultiplier || 1);

    c.innerHTML = `
      <h2 class="detail-name">${esc(d.name)}</h2>
      <div class="detail-sub">${esc(d.category)} · ${esc(d.spirit)} · ${esc(d.abv || "")} ABV</div>
      <div class="detail-row">
        <span class="pill">Glass: <strong>${esc(d.glass)}</strong></span>
        <span class="pill">Method: <strong>${esc(d.method)}</strong></span>
        <span class="pill">Garnish: <strong>${esc(d.garnish)}</strong></span>
        <span class="pill">Est. cost: <strong>$${costPerPour.toFixed(2)}</strong></span>
      </div>
      ${tagsHtml ? `<div style="margin-bottom:10px">${tagsHtml}</div>` : ""}
      <div class="section-title">Ingredients</div>
      <ul class="ingredients">
        ${d.ingredients.map(i => `<li><span>${esc(i.item)}</span><span class="amount">${esc(i.amount)}</span></li>`).join("")}
      </ul>
      <div class="section-title">Method</div>
      <ol class="method-steps">
        ${d.steps.map(s => `<li>${esc(s)}</li>`).join("")}
      </ol>
      ${d.note ? `<div class="note">${esc(d.note)}</div>` : ""}
      ${siblings.length ? `
        <div class="section-title">${esc(family)} Family</div>
        <p style="font-size:12px;color:var(--muted);margin:0 0 8px">Same template, different spirit or twist:</p>
        <div class="variation-list">
          ${siblings.map(s => `<button class="variation-chip" data-drink="${esc(s.name)}">${esc(s.name)}</button>`).join("")}
        </div>
      ` : ""}
    `;
    // hook variation chips
    $$(".variation-chip", c).forEach(chip => {
      chip.addEventListener("click", () => {
        const next = DRINKS.find(x => x.name === chip.dataset.drink);
        if (next) openDetail(next);
      });
    });
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  modal.addEventListener("click", e => {
    if (e.target.dataset.close) closeDetail();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !modal.hidden) closeDetail();
  });
  function closeDetail() {
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  // ── search binding ──
  $("#search").addEventListener("input", e => {
    BB.state.search = e.target.value;
    renderGrid();
  });

  // ── main render entry ──
  BB.viewRenderers.browse = function browse() {
    renderChips();
    renderGrid();
  };

  // expose openDetail for cross-view use
  BB.openDetail = openDetail;
})();
