/* What Can I Make? — Tap what you have, see possible drinks. */
(() => {
  const BB = window.__BB;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  // Canonical shelf buckets — map drink ingredient strings to these
  const SHELF = [
    // Spirits
    "Gin", "Vodka", "White rum", "Dark rum", "Bourbon", "Rye whiskey", "Scotch whisky", "Irish whiskey",
    "Japanese whisky", "Blanco tequila", "Mezcal", "Cognac", "Pisco",
    // Liqueurs / modifiers
    "Triple sec / Cointreau", "Campari", "Aperol", "Sweet vermouth", "Dry vermouth",
    "Maraschino liqueur", "Green Chartreuse", "Amaro Nonino", "Coffee liqueur", "Baileys",
    "Grand Marnier", "Crème de cacao", "Crème de menthe", "Crème de mûre",
    "Amaretto", "Apple schnapps", "Fireball", "Drambuie", "Absinthe", "Peach purée",
    "Crème de cassis", "Orgeat",
    // Mixers / prep
    "Tonic water", "Soda water", "Ginger beer", "Ginger ale", "Cola", "Grapefruit soda",
    "Champagne / prosecco", "Coconut cream", "Pineapple juice", "Cranberry juice",
    "Grapefruit juice", "Orange juice",
    // Staples
    "Fresh lime juice", "Fresh lemon juice", "Simple syrup", "Honey",
    "Angostura bitters", "Peychaud's bitters", "Orange bitters",
    "Fresh mint", "Sugar", "Salt", "Hot coffee", "Egg white",
  ];

  // Map a shelf item → which ingredient strings in DRINKS satisfy it
  function matches(shelfItem, ing) {
    const s = shelfItem.toLowerCase();
    const i = ing.toLowerCase();
    if (i.includes(s)) return true;
    // friendly aliases
    const aliases = {
      "gin": ["gin"],
      "vodka": ["vodka", "citrus vodka"],
      "bourbon": ["bourbon", "rye whiskey", "bourbon or rye", "jack daniel"],
      "rye whiskey": ["rye whiskey", "rye"],
      "scotch whisky": ["scotch", "blended scotch", "islay"],
      "irish whiskey": ["irish whiskey"],
      "japanese whisky": ["japanese whisky"],
      "white rum": ["white rum"],
      "dark rum": ["dark rum", "dark/overproof", "aged rum", "gold rum"],
      "blanco tequila": ["tequila", "blanco tequila"],
      "mezcal": ["mezcal"],
      "cognac": ["cognac", "brandy"],
      "pisco": ["pisco"],
      "triple sec / cointreau": ["triple sec", "cointreau", "orange curaçao", "curaçao"],
      "sweet vermouth": ["sweet vermouth"],
      "dry vermouth": ["dry vermouth"],
      "campari": ["campari"],
      "aperol": ["aperol"],
      "maraschino liqueur": ["maraschino"],
      "green chartreuse": ["chartreuse"],
      "amaro nonino": ["amaro nonino", "amaro"],
      "coffee liqueur": ["coffee liqueur", "kahlúa", "kahlua"],
      "baileys": ["baileys"],
      "grand marnier": ["grand marnier"],
      "crème de cacao": ["crème de cacao"],
      "crème de menthe": ["crème de menthe"],
      "crème de mûre": ["crème de mûre"],
      "amaretto": ["amaretto"],
      "apple schnapps": ["apple schnapps", "sour apple"],
      "fireball": ["fireball"],
      "drambuie": ["drambuie"],
      "absinthe": ["absinthe"],
      "peach purée": ["peach purée"],
      "crème de cassis": ["crème de cassis"],
      "orgeat": ["orgeat"],
      "tonic water": ["tonic"],
      "soda water": ["soda water"],
      "ginger beer": ["ginger beer"],
      "ginger ale": ["ginger ale"],
      "cola": ["cola", "coca-cola"],
      "grapefruit soda": ["grapefruit soda", "jarritos", "squirt"],
      "champagne / prosecco": ["champagne", "prosecco", "sparkling"],
      "coconut cream": ["coconut cream"],
      "pineapple juice": ["pineapple juice"],
      "cranberry juice": ["cranberry juice"],
      "grapefruit juice": ["grapefruit juice"],
      "orange juice": ["orange juice"],
      "fresh lime juice": ["lime juice"],
      "fresh lemon juice": ["lemon juice"],
      "simple syrup": ["simple syrup", "sugar cube", "agave syrup", "honey-ginger"],
      "honey": ["honey"],
      "angostura bitters": ["angostura"],
      "peychaud's bitters": ["peychaud"],
      "orange bitters": ["orange bitters"],
      "fresh mint": ["mint"],
      "sugar": ["sugar cube", "brown sugar"],
      "salt": ["salt"],
      "hot coffee": ["hot coffee", "espresso"],
      "egg white": ["egg white"],
    };
    const k = s;
    if (aliases[k]) return aliases[k].some(a => i.includes(a));
    return false;
  }

  function canMake(drink, shelfSet) {
    // Every ingredient must be satisfied by at least one shelf item,
    // OR be an "optional" ingredient (label says optional, or is a garnish-level)
    return drink.ingredients.every(ing => {
      const low = ing.item.toLowerCase();
      // Optional ingredients give a pass
      if (low.includes("optional") || /\(optional\)/.test(ing.item)) return true;
      // Ignore soft-garnish items that appear in ingredient list but are really garnish
      if (["orange peel", "lemon peel", "lime wedge", "lime wheel"].some(g => low === g || low.startsWith(g))) {
        // we consider citrus a staple if the shelf has lime or lemon juice
        if (low.includes("lime")) return shelfSet.has("Fresh lime juice");
        if (low.includes("lemon")) return shelfSet.has("Fresh lemon juice");
        if (low.includes("orange")) return shelfSet.has("Orange juice") || shelfSet.has("Triple sec / Cointreau");
      }
      return [...shelfSet].some(s => matches(s, ing.item));
    });
  }

  function render() {
    const host = $("#whatcan-body");
    const current = new Set(BB.persist.inventory);
    const grouped = {
      "Spirits": SHELF.slice(0, 13),
      "Liqueurs & Modifiers": SHELF.slice(13, 32),
      "Mixers": SHELF.slice(32, 43),
      "Staples": SHELF.slice(43),
    };
    const sections = Object.entries(grouped).map(([group, items]) => `
      <div class="wcm-section">
        <h3>${esc(group)}</h3>
        <div class="wcm-grid">
          ${items.map(it => `
            <button class="wcm-chip ${current.has(it) ? "on" : ""}" data-item="${esc(it)}">${esc(it)}</button>
          `).join("")}
        </div>
      </div>
    `).join("");

    const possible = DRINKS.filter(d => canMake(d, current));
    const resultsHtml = `
      <div class="wcm-results">
        <div class="wcm-count"><strong>${possible.length}</strong> drink${possible.length === 1 ? "" : "s"} you can make with what you have</div>
        <div class="drink-grid">
          ${possible.slice(0, 40).map(d => `
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

    host.innerHTML = `
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
        <button class="btn" id="wcm-clear" style="max-width:140px">Clear all</button>
        <span style="font-size:12px;color:var(--muted)">${current.size} selected</span>
      </div>
      ${sections}
      ${resultsHtml}
    `;

    host.querySelectorAll(".wcm-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const it = chip.dataset.item;
        const idx = BB.persist.inventory.indexOf(it);
        if (idx >= 0) BB.persist.inventory.splice(idx, 1);
        else BB.persist.inventory.push(it);
        BB.saveState();
        BB.haptic(8);
        render();
      });
    });
    host.querySelectorAll(".drink-card").forEach(card => {
      card.addEventListener("click", () => {
        const d = DRINKS.find(x => x.name === card.dataset.drink);
        if (d) BB.openDetail(d);
      });
    });
    $("#wcm-clear").addEventListener("click", () => {
      BB.persist.inventory = [];
      BB.saveState();
      render();
    });
  }

  BB.viewRenderers.whatcan = render;
})();
