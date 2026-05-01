/* Wine & beer basics — guests ask bartenders about these constantly */
const WINE_BEER = {
  wine: {
    reds: [
      { name: "Cabernet Sauvignon", profile: "Bold, full-bodied, black currant, tannic", pairs: "Steak, lamb, hard cheeses" },
      { name: "Merlot", profile: "Softer than Cab, plum, chocolate, smoother tannins", pairs: "Pork, roast chicken, mushroom dishes" },
      { name: "Pinot Noir", profile: "Light-medium, cherry, earthy, low tannin", pairs: "Salmon, duck, mushroom — the 'versatile red'" },
      { name: "Malbec", profile: "Medium-full, dark fruit, smoky, Argentine classic", pairs: "Grilled meats, burgers" },
      { name: "Syrah / Shiraz", profile: "Full-bodied, peppery, blackberry, meaty", pairs: "BBQ, game, stews" },
      { name: "Zinfandel", profile: "Jammy, high alcohol, spicy", pairs: "Pizza, BBQ, spicy food" },
    ],
    whites: [
      { name: "Chardonnay", profile: "Ranges from crisp/citrus (unoaked) to buttery/vanilla (oaked)", pairs: "Chicken, cream sauces, lobster (oaked); seafood (unoaked)" },
      { name: "Sauvignon Blanc", profile: "Crisp, grassy, citrus, grapefruit", pairs: "Goat cheese, salads, shellfish" },
      { name: "Pinot Grigio / Gris", profile: "Light, clean, pear, green apple", pairs: "Light seafood, salads, easy-drinking" },
      { name: "Riesling", profile: "Can be bone dry to sweet — always check. Peach, honey, petrol note", pairs: "Spicy Asian food, pork, cheese" },
      { name: "Moscato", profile: "Sweet, low alcohol, floral, peach", pairs: "Dessert, fruit, spicy food" },
    ],
    rose: [
      { name: "Rosé", profile: "Dry Provence-style is most common — strawberry, mineral, crisp", pairs: "Salad, grilled fish, summer patio" },
    ],
    sparkling: [
      { name: "Champagne", profile: "Only from Champagne, France. Toasty, brioche, dry (Brut)", pairs: "Celebration, oysters, fried food (the bubbles cut grease)" },
      { name: "Prosecco", profile: "Italian, fruitier, softer, less toasty", pairs: "Mimosas, Bellinis, aperitif" },
      { name: "Cava", profile: "Spanish, made in Champagne method, dry and crisp", pairs: "Tapas, seafood" },
    ],
    tips: [
      "Sweetness levels on labels: Brut (dry) < Extra Dry < Dry < Demi-Sec < Doux. 'Dry' sparkling is actually sweet. Confusing — memorize it.",
      "Serve reds slightly below room temp (60–65°F), whites and sparkling cold (45–50°F).",
      "Hold wine glasses by the stem — body heat warms the wine.",
      "When pouring, fill wine glass only 1/3 full. Room to swirl = room to smell.",
    ],
  },
  beer: {
    styles: [
      { name: "Pilsner / Lager", profile: "Light, crisp, clean, golden. Most common 'beer' order.", examples: "Heineken, Stella, Pilsner Urquell, Budweiser" },
      { name: "IPA (India Pale Ale)", profile: "Hoppy, bitter, often citrus or pine. Higher ABV.", examples: "Sierra Nevada, Lagunitas, Stone IPA, Hazy IPAs" },
      { name: "Pale Ale", profile: "Balanced hops + malt, less aggressive than IPA", examples: "Sierra Nevada Pale Ale, Firestone 805" },
      { name: "Wheat Beer / Hefeweizen", profile: "Cloudy, banana/clove, light, easy", examples: "Blue Moon, Allagash White, Paulaner" },
      { name: "Stout", profile: "Dark, roasted, coffee/chocolate notes", examples: "Guinness, Founders Breakfast Stout" },
      { name: "Porter", profile: "Like a lighter stout — roasty, smooth", examples: "Founders Porter, Anchor Porter" },
      { name: "Sour / Gose", profile: "Tart, funky, sometimes fruit-forward", examples: "Rodenbach, Anderson Valley Gose" },
      { name: "Hard Seltzer", profile: "Neutral, fizzy, low calorie, flavored", examples: "White Claw, Truly" },
    ],
    tips: [
      "Pour beer into a glass tilted 45°, then straighten for a 1-finger head. Foam = released aroma, not wasted beer.",
      "If a guest asks 'what's light?' they usually mean low-calorie OR light in flavor. Ask which.",
      "Draft beer glassware matters — Pilsners in tall narrow, Stouts in tulips, IPAs in snifters.",
      "'Shaken' vs 'Bottled' doesn't apply to beer — never shake a beer.",
      "If a keg starts foaming heavily, it's usually a temp issue. Let the bar manager know.",
    ],
  },
};
