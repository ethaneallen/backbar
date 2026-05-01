/* Settings view — theme, accent, haptics, price multiplier, reset progress */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);

  function render() {
    const host = $("#settings-body");
    host.innerHTML = `
      <div class="settings-section">
        <h2>Theme</h2>
        <div class="settings-row">
          <div>
            <div class="label">Appearance</div>
            <div class="desc">Dark for low light, light for day, dim for warm bar lighting.</div>
          </div>
          <div class="theme-switcher">
            <button class="theme-opt dark ${BB.persist.theme==='dark'?'active':''}" data-t="dark" title="Dark"></button>
            <button class="theme-opt dim ${BB.persist.theme==='dim'?'active':''}" data-t="dim" title="Dim"></button>
            <button class="theme-opt light ${BB.persist.theme==='light'?'active':''}" data-t="light" title="Light"></button>
          </div>
        </div>
        <div class="settings-row">
          <div>
            <div class="label">Accent color</div>
            <div class="desc">Gold is classic. Pick whatever you like.</div>
          </div>
          <div class="accent-switcher">
            ${["gold","copper","emerald","crimson","cobalt"].map(a => `
              <button class="accent-opt ${a} ${BB.persist.accent===a?'active':''}" data-a="${a}" title="${a}"></button>
            `).join("")}
          </div>
        </div>
      </div>

      <div class="settings-section">
        <h2>Feel</h2>
        <div class="settings-row">
          <div>
            <div class="label">Haptic feedback</div>
            <div class="desc">Subtle vibrations on quiz actions (phone only).</div>
          </div>
          <label class="switch">
            <input type="checkbox" id="haptics-toggle" ${BB.persist.haptics ? "checked" : ""}>
            <span style="font-size:13px;color:var(--muted)" id="haptics-label">${BB.persist.haptics ? "On" : "Off"}</span>
          </label>
        </div>
      </div>

      <div class="settings-section">
        <h2>Cost estimator</h2>
        <div class="settings-row">
          <div>
            <div class="label">Price multiplier</div>
            <div class="desc">Adjust liquor-cost estimates for your bar (1.0 = default).</div>
          </div>
          <input type="number" min="0.5" max="3" step="0.1" value="${BB.persist.priceMultiplier}" id="price-mult" style="width:80px;padding:6px 8px;background:var(--bg-3);border:1px solid var(--border);border-radius:8px;text-align:center">
        </div>
      </div>

      <div class="settings-section">
        <h2>Progress</h2>
        <div class="settings-row">
          <div>
            <div class="label">Reset learning progress</div>
            <div class="desc">Clears spaced-repetition boxes, quiz history, and speed-drill best.</div>
          </div>
          <button class="btn bad" id="reset-progress" style="max-width:120px">Reset</button>
        </div>
      </div>

      <div class="settings-section">
        <h2>About</h2>
        <p style="margin:0;font-size:13px;color:var(--muted);line-height:1.55">
          Backbar · works offline once loaded · all progress stored locally on this device.
          Built for bartenders learning the craft.
        </p>
      </div>
    `;

    host.querySelectorAll(".theme-opt").forEach(b => b.addEventListener("click", () => {
      BB.persist.theme = b.dataset.t;
      BB.saveState();
      document.documentElement.setAttribute("data-theme", BB.persist.theme);
      render();
    }));
    host.querySelectorAll(".accent-opt").forEach(b => b.addEventListener("click", () => {
      BB.persist.accent = b.dataset.a;
      BB.saveState();
      document.documentElement.setAttribute("data-accent", BB.persist.accent);
      render();
    }));
    $("#haptics-toggle").addEventListener("change", e => {
      BB.persist.haptics = e.target.checked;
      BB.saveState();
      $("#haptics-label").textContent = BB.persist.haptics ? "On" : "Off";
      if (BB.persist.haptics) BB.haptic(15);
    });
    $("#price-mult").addEventListener("change", e => {
      const v = parseFloat(e.target.value);
      if (!isNaN(v) && v >= 0.5 && v <= 3) {
        BB.persist.priceMultiplier = v;
        BB.saveState();
        BB.toast("Cost multiplier saved");
      }
    });
    $("#reset-progress").addEventListener("click", () => {
      if (confirm("Really reset all learning progress? This can't be undone.")) {
        BB.resetProgress();
        render();
      }
    });
  }

  BB.viewRenderers.settings = render;
})();
