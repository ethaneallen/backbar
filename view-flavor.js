/* Flavor finder — pick flavor tags + filters, see matches */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const selected = { flavors: new Set(), abv: null, spirit: null };

  function render() {
    const host = $("#flavor-body");
    const flavors = BB.allFlavors();
    const spirits = BB.allSpirits();

    const matches = DRINKS.filter(d => {
      if (selected.flavors.size) {
        const tags = new Set(d.tags || []);
        for (const f of selected.flavors) if (!tags.has(f)) return false;
      }
      if (selected.abv && d.abv !== selected.abv) return false;
      if (selected.spirit && d.spirit !== selected.spirit) return false;
      return true;
    });

    host.innerHTML = `
      <div class="flavor-section">
        <h3>Flavor profile</h3>
        <div class="wcm-grid">
          ${flavors.map(f => `
            <button class="wcm-chip ${selected.flavors.has(f) ? "on" : ""}" data-flavor="${esc(f)}">${esc(f)}</button>
          `).join("")}
        </div>
      </div>
      <div class="flavor-section">
        <h3>Strength</h3>
        <div class="wcm-grid">
          ${["low","med","high","very-high"].map(a => `
            <button class="wcm-chip ${selected.abv === a ? "on" : ""}" data-abv="${a}">${a === "very-high" ? "very strong" : a === "high" ? "strong" : a === "med" ? "medium" : "light"}</button>
          `).join("")}
        </div>
      </div>
      <div class="flavor-section">
        <h3>Base spirit</h3>
        <div class="wcm-grid">
          ${spirits.map(s => `
            <button class="wcm-chip ${selected.spirit === s ? "on" : ""}" data-spirit="${esc(s)}">${esc(s)}</button>
          `).join("")}
        </div>
      </div>
      <div class="wcm-results">
        <div class="wcm-count"><strong>${matches.length}</strong> match${matches.length === 1 ? "" : "es"}</div>
        <div class="drink-grid">
          ${matches.slice(0, 40).map(d => `
            <button class="drink-card" data-drink="${esc(d.name)}">
              <span class="status-dot ${BB.cardStatus(d.name)}"></span>
              <div class="name">${esc(d.name)}</div>
              <div class="meta">${esc(d.glass)} · ${esc(d.method)}</div>
              <div class="spirit-tag">${esc(d.spirit)}</div>
            </button>
          `).join("")}
        </div>
      </div>
    `;
    host.querySelectorAll("[data-flavor]").forEach(b => b.addEventListener("click", () => {
      const f = b.dataset.flavor;
      selected.flavors.has(f) ? selected.flavors.delete(f) : selected.flavors.add(f);
      BB.haptic(6); render();
    }));
    host.querySelectorAll("[data-abv]").forEach(b => b.addEventListener("click", () => {
      selected.abv = selected.abv === b.dataset.abv ? null : b.dataset.abv;
      BB.haptic(6); render();
    }));
    host.querySelectorAll("[data-spirit]").forEach(b => b.addEventListener("click", () => {
      selected.spirit = selected.spirit === b.dataset.spirit ? null : b.dataset.spirit;
      BB.haptic(6); render();
    }));
    host.querySelectorAll(".drink-card").forEach(card => card.addEventListener("click", () => {
      const d = DRINKS.find(x => x.name === card.dataset.drink);
      if (d) BB.openDetail(d);
    }));
  }

  BB.viewRenderers.flavor = render;
})();
