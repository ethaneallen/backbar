/* Layers tags, family, flavor, abv, cost onto the base DRINKS array.
   Keeps drinks.js small and readable. */
(() => {
  const EXTRA = {
    "Old Fashioned":        { tags: ["spirit-forward","bitter","boozy"],         family: "Old Fashioned",     abv: "high",   cost: 2.50 },
    "Manhattan":            { tags: ["spirit-forward","boozy","herbal"],         family: "Manhattan",         abv: "high",   cost: 2.80 },
    "Martini (Gin)":        { tags: ["spirit-forward","dry","herbal"],           family: "Martini",           abv: "high",   cost: 2.60 },
    "Negroni":              { tags: ["bitter","boozy","herbal"],                 family: "Negroni",           abv: "high",   cost: 2.40 },
    "Daiquiri":             { tags: ["citrus","sweet-tart","refreshing"],        family: "Sour",              abv: "med",    cost: 1.80 },
    "Margarita":            { tags: ["citrus","sweet-tart","salty"],             family: "Sour",              abv: "med",    cost: 2.20 },
    "Mojito":               { tags: ["refreshing","citrus","minty","fizzy"],     family: "Highball",          abv: "med",    cost: 1.70 },
    "Whiskey Sour":         { tags: ["citrus","sweet-tart","silky"],             family: "Sour",              abv: "med",    cost: 1.90 },
    "Moscow Mule":          { tags: ["fizzy","citrus","spicy-ginger"],           family: "Mule",              abv: "med",    cost: 1.60 },
    "Cosmopolitan":         { tags: ["citrus","sweet-tart","fruity"],            family: "Sour",              abv: "med",    cost: 2.10 },
    "Gimlet":               { tags: ["citrus","sweet-tart","clean"],             family: "Sour",              abv: "med",    cost: 1.70 },
    "Sidecar":              { tags: ["citrus","sweet-tart","rich"],              family: "Sour",              abv: "high",   cost: 2.50 },
    "Amaretto Sour":        { tags: ["sweet","nutty","silky"],                   family: "Sour",              abv: "med",    cost: 1.60 },
    "Pisco Sour":           { tags: ["citrus","silky","floral"],                 family: "Sour",              abv: "med",    cost: 1.90 },
    "Tom Collins":          { tags: ["fizzy","citrus","refreshing"],             family: "Collins",           abv: "med",    cost: 1.60 },
    "Gin & Tonic":          { tags: ["fizzy","bitter","refreshing"],             family: "Highball",          abv: "med",    cost: 1.50 },
    "Vodka Soda":           { tags: ["fizzy","clean","low-cal"],                 family: "Highball",          abv: "med",    cost: 1.40 },
    "Rum & Coke / Cuba Libre": { tags: ["sweet","fizzy","easy"],                 family: "Highball",          abv: "med",    cost: 1.40 },
    "Whiskey Ginger":       { tags: ["fizzy","spicy-ginger","easy"],             family: "Highball",          abv: "med",    cost: 1.50 },
    "Paloma":               { tags: ["fizzy","citrus","refreshing"],             family: "Highball",          abv: "med",    cost: 1.70 },
    "Dark 'n' Stormy":      { tags: ["fizzy","spicy-ginger","rich"],             family: "Mule",              abv: "med",    cost: 1.70 },
    "Jack & Coke":          { tags: ["sweet","fizzy","easy"],                    family: "Highball",          abv: "med",    cost: 1.40 },
    "Highball (Japanese)":  { tags: ["fizzy","clean","refreshing"],              family: "Highball",          abv: "med",    cost: 2.20 },
    "Piña Colada":          { tags: ["tropical","creamy","sweet","fruity"],      family: "Tropical",          abv: "med",    cost: 2.00 },
    "Mai Tai":              { tags: ["tropical","citrus","nutty","boozy"],       family: "Tropical",          abv: "high",   cost: 2.80 },
    "Bay Breeze":           { tags: ["fruity","tropical","easy"],                family: "Highball",          abv: "low",    cost: 1.50 },
    "Sea Breeze":           { tags: ["fruity","tart","easy"],                    family: "Highball",          abv: "low",    cost: 1.50 },
    "Long Island Iced Tea": { tags: ["boozy","sweet","strong"],                  family: "Highball",          abv: "very-high", cost: 2.80 },
    "Mimosa":               { tags: ["fizzy","citrus","brunch"],                 family: "Sparkling",         abv: "low",    cost: 1.40 },
    "Bellini":              { tags: ["fizzy","fruity","brunch"],                 family: "Sparkling",         abv: "low",    cost: 1.70 },
    "Aperol Spritz":        { tags: ["fizzy","bitter","refreshing","low-abv"],   family: "Sparkling",         abv: "low",    cost: 2.00 },
    "French 75":            { tags: ["fizzy","citrus","elegant"],                family: "Sparkling",         abv: "high",   cost: 2.40 },
    "Kir Royale":           { tags: ["fizzy","fruity","elegant"],                family: "Sparkling",         abv: "low",    cost: 1.60 },
    "Boulevardier":         { tags: ["bitter","boozy","rich"],                   family: "Negroni",           abv: "high",   cost: 2.50 },
    "Sazerac":              { tags: ["spirit-forward","herbal","boozy"],         family: "Old Fashioned",     abv: "high",   cost: 2.80 },
    "Mint Julep":           { tags: ["refreshing","minty","boozy"],              family: "Julep",             abv: "high",   cost: 2.00 },
    "Rusty Nail":           { tags: ["spirit-forward","sweet","rich"],           family: "Duo",               abv: "high",   cost: 2.40 },
    "Irish Coffee":         { tags: ["hot","creamy","rich","coffee"],            family: "Hot",               abv: "med",    cost: 1.80 },
    "Hot Toddy":            { tags: ["hot","citrus","honeyed"],                  family: "Hot",               abv: "med",    cost: 1.70 },
    "Espresso Martini":     { tags: ["coffee","sweet","silky"],                  family: "Dessert",           abv: "med",    cost: 2.20 },
    "White Russian":        { tags: ["creamy","coffee","sweet"],                 family: "Dessert",           abv: "med",    cost: 2.00 },
    "Black Russian":        { tags: ["coffee","sweet","boozy"],                  family: "Dessert",           abv: "high",   cost: 1.80 },
    "Brandy Alexander":     { tags: ["creamy","chocolate","rich"],               family: "Dessert",           abv: "med",    cost: 2.30 },
    "Grasshopper":          { tags: ["creamy","minty","chocolate","sweet"],      family: "Dessert",           abv: "low",    cost: 1.80 },
    "Mudslide":             { tags: ["creamy","sweet","chocolate"],              family: "Dessert",           abv: "med",    cost: 2.40 },
    "Penicillin":           { tags: ["smoky","citrus","honeyed","spicy-ginger"], family: "Sour",              abv: "high",   cost: 2.60 },
    "Paper Plane":          { tags: ["bitter","citrus","balanced"],              family: "Sour",              abv: "med",    cost: 2.40 },
    "Last Word":            { tags: ["herbal","citrus","boozy"],                 family: "Equal Parts",       abv: "high",   cost: 2.80 },
    "Bramble":              { tags: ["fruity","tart","refreshing"],              family: "Sour",              abv: "med",    cost: 2.00 },
    "Moscow Mule (Kentucky Mule)": { tags: ["fizzy","spicy-ginger","citrus"],    family: "Mule",              abv: "med",    cost: 1.70 },
    "Lemon Drop":           { tags: ["citrus","sweet-tart","shot"],              family: "Shot",              abv: "high",   cost: 1.20 },
    "Kamikaze":             { tags: ["citrus","sweet-tart","shot"],              family: "Shot",              abv: "high",   cost: 1.10 },
    "B-52":                 { tags: ["sweet","creamy","shot","layered"],         family: "Shot",              abv: "high",   cost: 1.50 },
    "Tequila Shot":         { tags: ["boozy","shot","salty"],                    family: "Shot",              abv: "very-high", cost: 1.10 },
    "Washington Apple":     { tags: ["sweet","fruity","shot"],                   family: "Shot",              abv: "high",   cost: 1.30 },
    "Fireball Shot":        { tags: ["hot","sweet","shot","cinnamon"],           family: "Shot",              abv: "high",   cost: 1.00 },
  };

  if (typeof DRINKS !== 'undefined') {
    DRINKS.forEach(d => {
      const e = EXTRA[d.name];
      if (e) Object.assign(d, e);
      if (!d.tags) d.tags = [];
      if (!d.family) d.family = d.category;
      if (!d.abv) d.abv = "med";
      if (!d.cost) d.cost = 2.00;
    });
  }
})();
