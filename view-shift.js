/* Shift Mode — huge text, one-tap lookup */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  let query = "";

  function renderResults() {
    const q = query.trim().toLowerCase();
    const matches = q ? DRINKS.filter(d =>
      d.name.toLowerCase().includes(q) ||
      (d.ingredients || []).some(i => i.item.toLowerCase().includes(q))
    ).slice(0, 6) : DRINKS.slice(0, 6);

    const results = $("#shift-results");
    if (results) {
      results.innerHTML = matches.map(d => `
        <div class="shift-card">
          <h3>${esc(d.name)}<span style="font-size:13px;color:var(--muted);font-weight:400">${esc(d.glass)}</span></h3>
          <div class="meta-line">${esc(d.method)} · garnish ${esc(d.garnish)}</div>
          <ul>
            ${d.ingredients.map(i => `<li><span>${esc(i.item)}</span><span class="amount">${esc(i.amount)}</span></li>`).join("")}
          </ul>
        </div>
      `).join("");
    }
  }

  function render() {
    const host = $("#shift-body");
    host.innerHTML = `
      <input class="shift-search" id="shift-q" placeholder="Type a drink…" value="${esc(query)}" autocomplete="off" spellcheck="false">
      <div class="shift-results" id="shift-results"></div>
    `;
    const inp = $("#shift-q");
    inp.focus();
    inp.addEventListener("input", e => { query = e.target.value; renderResults(); });
    renderResults();
  }

  BB.viewRenderers.shift = render;
})();
