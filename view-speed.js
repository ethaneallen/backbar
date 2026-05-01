/* Speed drill — timed recall, 60 seconds, count how many you can name */
(() => {
  const BB = window.__BB;
  const $  = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  const ROUND_SECONDS = 60;

  function intro() {
    $("#speed-body").innerHTML = `
      <div class="speed-intro">
        <p>You'll see a drink name. Hit <strong>Got It</strong> if you can name every ingredient and the method. Hit <strong>Skip</strong> if not. How many can you clear in <strong>60 seconds</strong>?</p>
        <p style="font-size:13px">Your best: <strong>${BB.persist.scoreboard.bestSpeed || 0}</strong></p>
        <button class="speed-start btn primary" id="speed-start">Start Drill</button>
      </div>
    `;
    $("#speed-start").addEventListener("click", start);
  }

  function start() {
    const deck = [...DRINKS].sort(() => Math.random() - 0.5);
    BB.state.speed = {
      deck, idx: 0, cleared: 0, skipped: 0,
      endsAt: Date.now() + ROUND_SECONDS * 1000,
    };
    BB.haptic(12);
    tick();
    BB.state.speedTimer = setInterval(tick, 100);
  }

  function tick() {
    const s = BB.state.speed;
    if (!s) return;
    const remaining = Math.max(0, Math.ceil((s.endsAt - Date.now()) / 1000));
    if (remaining <= 0) return end();
    render(remaining);
  }

  function render(remaining) {
    const s = BB.state.speed;
    const d = s.deck[s.idx % s.deck.length];
    const timerClass = remaining <= 5 ? "crit" : remaining <= 15 ? "warn" : "";
    $("#speed-body").innerHTML = `
      <div class="speed-running">
        <div class="speed-timer ${timerClass}">${remaining}s</div>
        <div class="speed-counter">Cleared: ${s.cleared} · Skipped: ${s.skipped}</div>
        <div class="speed-card">
          <div class="drink-name">${esc(d.name)}</div>
        </div>
        <div class="quiz-actions">
          <button class="btn bad" id="s-skip">Skip</button>
          <button class="btn primary" id="s-got">Got It</button>
        </div>
      </div>
    `;
    $("#s-got").addEventListener("click", () => { s.cleared++; s.idx++; BB.haptic(10); tick(); });
    $("#s-skip").addEventListener("click", () => { s.skipped++; s.idx++; BB.haptic([8,20]); tick(); });
  }

  function end() {
    clearInterval(BB.state.speedTimer);
    const s = BB.state.speed;
    if (s.cleared > (BB.persist.scoreboard.bestSpeed || 0)) {
      BB.persist.scoreboard.bestSpeed = s.cleared;
      BB.saveState();
      BB.haptic([20, 30, 20]);
    }
    $("#speed-body").innerHTML = `
      <div class="speed-results">
        <div class="speed-counter">Time's up</div>
        <div class="speed-score">${s.cleared}</div>
        <div class="speed-summary">Cleared · ${s.skipped} skipped · best ${BB.persist.scoreboard.bestSpeed}</div>
        <button class="btn primary" id="s-again" style="max-width:200px;margin:0 auto;display:block">Go Again</button>
      </div>
    `;
    $("#s-again").addEventListener("click", intro);
    BB.state.speed = null;
  }

  BB.viewRenderers.speed = function speed() {
    if (BB.state.speedTimer) { clearInterval(BB.state.speedTimer); BB.state.speedTimer = null; }
    BB.state.speed = null;
    intro();
  };
})();
