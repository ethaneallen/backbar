/* Ratio trainer — learn templates, not recipes */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function render() {
    const host = $("#ratios-body");
    host.innerHTML = RATIOS.map(r => `
      <div class="ratio-card">
        <h3>${esc(r.name)}</h3>
        <div class="formula">${esc(r.formula)}</div>
        <div class="breakdown">${esc(r.breakdown)}</div>
        <div class="section-title">Drinks that follow this pattern</div>
        <ul>
          ${r.examples.map(e => `<li>${esc(e)}</li>`).join("")}
        </ul>
        <div class="note">${esc(r.tip)}</div>
      </div>
    `).join("");
  }

  BB.viewRenderers.ratios = render;
})();
