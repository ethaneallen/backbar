/* Reference views — spirits, glassware, garnish, techniques, mistakes, wine/beer, service */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  BB.viewRenderers.spirits = function () {
    $("#spirits-body").innerHTML = SPIRITS.map(s => `
      <div class="spirit-card">
        <h2>${s.icon} ${esc(s.name)}</h2>
        <p class="summary">${esc(s.summary)}</p>
        ${s.types.map(t => `
          <div class="spirit-type">
            <span class="label">${esc(t.label)}</span>
            <div class="body">${esc(t.body)}</div>
          </div>
        `).join("")}
        <div class="note">${esc(s.tip)}</div>
      </div>
    `).join("");
  };

  BB.viewRenderers.glassware = function () {
    $("#glassware-body").innerHTML = `
      <div class="glass-grid">
        ${GLASSWARE.map(g => `
          <div class="glass-card">
            ${g.svg}
            <div class="gc-body">
              <h3>${esc(g.name)}</h3>
              <div class="size">${esc(g.size)}</div>
              <p class="use">${esc(g.use)}</p>
              <p class="why">${esc(g.why)}</p>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  };

  BB.viewRenderers.garnish = function () {
    $("#garnish-body").innerHTML = GARNISHES.map(g => `
      <div class="garnish-item">
        <h3>${esc(g.name)}</h3>
        <div class="when">${esc(g.use)}</div>
        <ol>${g.how.map(step => `<li>${esc(step)}</li>`).join("")}</ol>
        <div class="tip">Tip: ${esc(g.tip)}</div>
      </div>
    `).join("");
  };

  BB.viewRenderers.techniques = function () {
    $("#techniques-list").innerHTML = TECHNIQUES.map(t => `
      <div class="tech-item">
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.body)}</p>
      </div>
    `).join("");
  };

  BB.viewRenderers.mistakes = function () {
    $("#mistakes-body").innerHTML = MISTAKES.map(m => `
      <div class="mistake-item">
        <h3>⚠️ ${esc(m.mistake)}</h3>
        <div class="label">Why it matters</div>
        <p>${esc(m.why)}</p>
        <div class="label">Fix</div>
        <p class="fix">${esc(m.fix)}</p>
      </div>
    `).join("");
  };

  BB.viewRenderers.winebeer = function () {
    const host = $("#winebeer-body");
    const wb = WINE_BEER;
    const wineGroup = (label, list) => `
      <div class="wb-group">
        <h2>${esc(label)}</h2>
        ${list.map(w => `
          <div class="wb-item">
            <h3>${esc(w.name)}</h3>
            <p class="profile">${esc(w.profile)}</p>
            <p class="pairs"><strong>Pairs:</strong> ${esc(w.pairs)}</p>
          </div>
        `).join("")}
      </div>
    `;
    const beerGroup = `
      <div class="wb-group">
        <h2>Beer styles</h2>
        ${wb.beer.styles.map(b => `
          <div class="wb-item">
            <h3>${esc(b.name)}</h3>
            <p class="profile">${esc(b.profile)}</p>
            <p class="pairs"><strong>Examples:</strong> ${esc(b.examples)}</p>
          </div>
        `).join("")}
        <div class="wb-tips">
          <ul>${wb.beer.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
        </div>
      </div>
    `;
    host.innerHTML = `
      ${wineGroup("Red Wine",      wb.wine.reds)}
      ${wineGroup("White Wine",    wb.wine.whites)}
      ${wineGroup("Rosé",          wb.wine.rose)}
      ${wineGroup("Sparkling",     wb.wine.sparkling)}
      <div class="wb-tips">
        <ul>${wb.wine.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      ${beerGroup}
    `;
  };

  BB.viewRenderers.service = function () {
    $("#service-body").innerHTML = SERVICE.map(s => `
      <div class="service-item">
        <div class="situation">Situation</div>
        <h3>${esc(s.situation)}</h3>
        <div class="quote">${esc(s.script)}</div>
        <p class="reasoning">${esc(s.reasoning)}</p>
      </div>
    `).join("");
  };
})();
