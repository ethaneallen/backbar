/* Garnish prep — how to cut it, when to use it */
const GARNISHES = [
  {
    name: "Citrus Wedge",
    use: "Gin & tonic, Vodka soda, Margarita, Mojito, Rum & Coke.",
    how: [
      "Slice off both ends of the lime/lemon.",
      "Cut in half lengthwise (pole to pole).",
      "Place each half cut-side down, slice lengthwise into 3–4 wedges.",
      "Slice a small notch in the center of each wedge — lets it sit on the rim.",
    ],
    tip: "One lime = 8 wedges. Store in a covered container, not out in the air.",
  },
  {
    name: "Citrus Wheel",
    use: "Whiskey Sour, Tom Collins, Sidecar, Mojito.",
    how: [
      "Slice off both ends.",
      "Slice crosswise into 1/8-inch rounds.",
      "Cut a small slit from edge to center so it sits on the rim, or just float on top.",
    ],
    tip: "Wheels are prettier than wedges but can't be squeezed. Choose based on whether the guest needs to squeeze more juice in.",
  },
  {
    name: "Citrus Twist / Peel",
    use: "Martini, Manhattan, Old Fashioned, Sazerac, French 75.",
    how: [
      "Use a Y-peeler or channel knife for wide strips — avoid white pith (it's bitter).",
      "Cut a 1–2 inch piece from the skin only.",
      "Hold over drink, skin-side DOWN, and pinch to spray oils across the surface.",
      "Rub around the rim of the glass, then drop in (or discard — ask the recipe).",
    ],
    tip: "'Express' the peel = pinch it. The oils on the drink's surface are the entire point of the garnish.",
  },
  {
    name: "Flamed Orange Peel",
    use: "Manhattan, Sazerac, Old Fashioned (premium presentation).",
    how: [
      "Cut a wide, thick orange peel with some pith attached.",
      "Hold a lit match 1 inch above the drink.",
      "Pinch the peel so the oils spray THROUGH the flame onto the drink.",
      "You should see a brief flash of fire — that's caramelized citrus oils.",
    ],
    tip: "Practice over a sink before trying it in front of guests. Don't set a guest on fire.",
  },
  {
    name: "Salt / Sugar Rim",
    use: "Salt: Margarita, Paloma, Salty Dog. Sugar: Lemon Drop, Sidecar.",
    how: [
      "Pour salt or sugar on a small plate in a shallow even layer.",
      "Run a citrus wedge around HALF the rim of the glass (just the outside edge).",
      "Press the wet half into the salt/sugar and rotate gently.",
      "Tap off excess.",
    ],
    tip: "HALF the rim — lets the guest drink from either side. Kosher salt, not iodized table salt.",
  },
  {
    name: "Cherry",
    use: "Manhattan, Old Fashioned, Whiskey Sour, Shirley Temple.",
    how: [
      "Use brandied (Luxardo) or house-made cherries for cocktails — NOT neon red maraschinos.",
      "Drop directly into the drink, or pierce with a pick and rest on the rim.",
    ],
    tip: "Luxardos cost more but taste infinitely better. Worth it on any serious drink.",
  },
  {
    name: "Mint Sprig",
    use: "Mojito, Mint Julep, Hugo Spritz.",
    how: [
      "Pick a sprig with 4–6 fresh leaves at the top.",
      "Slap the sprig hard between your palms once to release oils.",
      "Insert into the drink near a straw so the guest smells it while sipping.",
    ],
    tip: "Slapping the mint is about releasing aroma, not flavor. Don't shred it.",
  },
  {
    name: "Olive",
    use: "Dirty Martini, Gibson (onion instead).",
    how: [
      "Skewer 1 or 3 olives on a pick (always odd number for presentation).",
      "Use brine-cured, not stuffed with cheese or pimento unless asked.",
      "Drop in, or rest pick across the rim.",
    ],
    tip: "'Dirty' = splash of olive brine added to the drink. 'Filthy' = a lot more.",
  },
  {
    name: "Cucumber",
    use: "Hendrick's Gin & Tonic, Pimm's Cup, spa drinks.",
    how: [
      "Slice 1/8-inch rounds or long thin ribbons with a peeler.",
      "Insert ribbon along the inside of the glass for visual height.",
    ],
    tip: "Cucumber bruises fast — cut to order.",
  },
  {
    name: "Pineapple / Tropical",
    use: "Mai Tai, Piña Colada, tiki drinks.",
    how: [
      "Cut pineapple into spears or wedges with skin on.",
      "Leave some leaves attached for height and presentation.",
    ],
    tip: "Tiki drinks should look over-garnished. Mint, pineapple, orchid, cherry, paper umbrella — pile it on.",
  },
  {
    name: "Nutmeg / Dust",
    use: "Brandy Alexander, Painkiller, eggnog.",
    how: [
      "Hold whole nutmeg over drink, grate with a microplane — just 2–3 passes.",
      "Fine mist over the foam/cream.",
    ],
    tip: "Fresh nutmeg is 10x better than pre-ground. A tiny jar lasts years.",
  },
];
