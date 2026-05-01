/* Progress view — shows mastery across all drinks, allows PDF export */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  function render() {
    const host = $("#progress-body");
    const total = DRINKS.length;
    let nNew = 0, nLearning = 0, nMastered = 0;
    DRINKS.forEach(d => {
      const status = BB.cardStatus(d.name);
      if (status === "new") nNew++;
      else if (status === "learning") nLearning++;
      else nMastered++;
    });
    const pct = Math.round((nMastered / total) * 100);

    const weakest = DRINKS
      .map(d => {
        const c = BB.persist.drinkCards[d.name];
        if (!c || c.total === 0) return null;
        return { d, acc: c.correct / c.total, total: c.total };
      })
      .filter(Boolean)
      .sort((a, b) => a.acc - b.acc)
      .slice(0, 8);

    host.innerHTML = `
      <div class="progress-summary">
        <div class="stat-card"><div class="number new">${nNew}</div><div class="label">New</div></div>
        <div class="stat-card"><div class="number learning">${nLearning}</div><div class="label">Learning</div></div>
        <div class="stat-card"><div class="number mastered">${nMastered}</div><div class="label">Mastered</div></div>
      </div>
      <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <div style="text-align:center;font-size:13px;color:var(--muted);margin-bottom:10px">${pct}% of ${total} drinks mastered</div>

      <div class="progress-section">
        <h2>Weakest drinks (drill these)</h2>
        ${weakest.length ? `
          <div class="progress-list">
            ${weakest.map(w => `
              <button class="progress-row" data-drink="${esc(w.d.name)}">
                <span>${esc(w.d.name)}</span>
                <span class="right">
                  <span>${Math.round(w.acc*100)}% over ${w.total}</span>
                  <span class="badge ${BB.cardStatus(w.d.name)}">${BB.cardStatus(w.d.name)}</span>
                </span>
              </button>
            `).join("")}
          </div>
        ` : `<p style="color:var(--muted);font-size:14px">Answer some quiz questions first — then your weakest drinks will show up here.</p>`}
      </div>

      <div class="progress-section">
        <h2>All drinks</h2>
        <div class="progress-list">
          ${DRINKS.map(d => {
            const c = BB.persist.drinkCards[d.name];
            const status = BB.cardStatus(d.name);
            const accText = c && c.total ? `${Math.round((c.correct/c.total)*100)}% · ${c.total}` : "—";
            return `
              <button class="progress-row" data-drink="${esc(d.name)}">
                <span>${esc(d.name)}</span>
                <span class="right">
                  <span>${accText}</span>
                  <span class="badge ${status}">${status}</span>
                </span>
              </button>
            `;
          }).join("")}
        </div>
      </div>

      <div class="progress-section">
        <h2>Export</h2>
        <p style="color:var(--muted);font-size:13px;margin-top:0">Print a cheat sheet of your weakest drinks to keep in your apron.</p>
        <button class="btn" id="export-weak" style="max-width:260px">Print cheat sheet (weakest)</button>
        <button class="btn" id="export-all" style="max-width:260px;margin-top:8px">Print cheat sheet (all)</button>
      </div>
    `;

    host.querySelectorAll(".progress-row").forEach(row => {
      row.addEventListener("click", () => {
        const d = DRINKS.find(x => x.name === row.dataset.drink);
        if (d) BB.openDetail(d);
      });
    });
    $("#export-weak").addEventListener("click", () => exportCheatSheet(weakest.map(w => w.d)));
    $("#export-all").addEventListener("click", () => exportCheatSheet(DRINKS));
  }

  function exportCheatSheet(list) {
    if (!list.length) { BB.toast("Nothing to export yet"); return; }
    const w = window.open("", "_blank");
    if (!w) { BB.toast("Popup blocked — allow popups to print"); return; }
    w.document.write(`<!doctype html><html><head><title>Cheat Sheet</title>
<style>
  body { font-family: -apple-system, "Segoe UI", Roboto, sans-serif; color: #111; padding: 20px; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  h2 { font-size: 14px; margin: 18px 0 4px; border-bottom: 1px solid #ccc; padding-bottom: 2px; }
  .meta { font-size: 11px; color: #555; margin-bottom: 4px; }
  ul { margin: 4px 0 8px 0; padding-left: 18px; font-size: 12px; }
  .two-col { column-count: 2; column-gap: 20px; }
  .drink { break-inside: avoid; margin-bottom: 10px; }
  @media print { body { padding: 10mm; } }
</style></head><body>
<h1>Backbar — Cheat Sheet</h1>
<div class="meta">${new Date().toLocaleDateString()} · ${list.length} drinks</div>
<div class="two-col">
  ${list.map(d => `
    <div class="drink">
      <h2>${esc(d.name)}</h2>
      <div class="meta">${esc(d.glass)} · ${esc(d.method)} · ${esc(d.garnish)}</div>
      <ul>
        ${d.ingredients.map(i => `<li>${esc(i.amount)} — ${esc(i.item)}</li>`).join("")}
      </ul>
    </div>
  `).join("")}
</div>
<script>window.print()</script>
</body></html>`);
    w.document.close();
  }

  BB.viewRenderers.progress = render;
})();
