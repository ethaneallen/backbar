# 🍸 Backbar — Bartender's Pocket Guide

A free, offline-first study and reference app for bartenders learning the craft. Master 54 cocktails with spaced repetition, speed drills, and a full behind-the-bar toolkit — no account, no ads, no internet required.

---

## ✨ Features

### 📖 Browse Drinks
- **54 cocktails** across 9 categories: Classics, Sours, Highballs, Tropical, Bubbly, Whiskey, Dessert, Modern, and Shots
- Full-text search across drink names, spirits, ingredients, glassware, and flavor tags
- Detail modal with full recipe, step-by-step method, garnish, glass, ABV level, estimated pour cost, bartender notes, and **drink family navigation** (tap through related cocktails)
- Mastery status indicators on every card (new / learning / mastered)

### 🎯 Quiz — Spaced Repetition
- **Leitner 5-box system** with scientifically-spaced review intervals (immediate → 12h → 3 days → 1 week → 3 weeks)
- Two quiz modes: **Name → Recipe** and **Recipe → Name**
- Filter by category to focus your study
- Swipe gestures (right = correct, left = missed) or tap buttons
- Session stats with correct/total/percentage tracking

### ⚡ Speed Drill
- 60-second timed recall game — drink names flash, hit "Got It" or "Skip"
- Tracks your cleared count, skips, and **personal best**
- Timer visual countdown (yellow at 15s, red at 5s)

### 📐 Ratio Trainer
- **9 master ratio templates** every bartender should know:
  - The Sour (2 : 0.75 : 0.75), The Old Fashioned (2 : 0.25 : dashes), The Martini/Manhattan, Equal Parts, The Highball, The Collins/Fizz, The Mule/Buck, The Spritz (3 : 2 : 1), The Daisy
- Example drinks and pro tips for each ratio

### 📈 My Progress
- Dashboard with New / Learning / Mastered counts and progress bar
- Weakest drinks list sorted by accuracy
- Full drink list with attempt count and accuracy percentage
- **Print/export** cheat sheets (weakest drinks or full list) in a print-optimized 2-column layout

---

### 🧪 What Can I Make?
- Tap ingredients you have on hand from a categorized shelf (~56 items across Spirits, Liqueurs, Mixers, and Staples)
- Smart matching with ingredient aliases (e.g. "bourbon" matches "bourbon or rye")
- Instantly shows which drinks you can make
- Inventory persists between sessions

### 👅 Flavor Finder
- Multi-filter search by **flavor tags** (citrus, bitter, tropical, minty, smoky, etc.), **strength** (light → very strong), and **base spirit**
- Perfect for "I want something citrusy, not too sweet"

### 🔦 Shift Mode
- Large-text, minimal-UI quick-lookup designed for use during a busy shift
- Oversized search input, up to 6 big readable recipe cards
- Accessible via the header shortcut button

---

### 🥃 Spirits 101
- Deep reference for **7 spirit categories** with subtypes:
  - Whiskey (Bourbon, Rye, Tennessee, Scotch, Irish, Japanese, Canadian)
  - Gin (5 styles), Rum (7 types), Tequila & Mezcal (6 types), Vodka (3 types), Brandy & Cognac (5 types), Liqueurs & Modifiers (11 types)
- Brand examples and bartender tips for each

### 🍷 Glassware Guide
- **14 glass types** with inline SVG illustrations
- Rocks, Highball, Collins, Coupe, Martini, Nick & Nora, Flute, Wine Glass, Copper Mug, Hurricane, Julep Cup, Shot Glass, Mug, and more
- Size info, typical drinks, and why the shape matters

### 🍋 Garnish Prep
- **11 garnish types** with step-by-step prep instructions
- Citrus wedge, wheel, twist, flamed peel, salt/sugar rim, cherry, mint sprig, olive, cucumber, pineapple, nutmeg
- Usage context and pro tips

### 🛠️ Techniques
- **13 core bartending techniques**: jigger measuring, shake, stir, build, muddle, strain, dry shake, express a peel, rim a glass, float/layer, ice selection, common ratios, reading the guest

### ⚠️ Mistakes to Avoid
- **14 common beginner mistakes** with "Why it matters" and "How to fix" for each
- Covers shaking vs stirring, over-muddling, free-pouring, old citrus, wrong ice, and more

### 🍺 Wine & Beer
- **15 wine varieties** (6 red, 5 white, 1 rosé, 3 sparkling) with flavor profiles and food pairings
- **8 beer styles** with descriptions and serving tips

### 💬 Service Scripts
- **13 real-world bar situations** with scripted responses and reasoning
- Handling over-served guests, allergy questions, returned drinks, comp requests, "make me something," last call, and more

---

## 🎨 Customization

| Option | Choices |
|---|---|
| **Theme** | Dark (default), Dim (warm amber for bar lighting), Light |
| **Accent color** | Gold, Copper, Emerald, Crimson, Cobalt |
| **Haptic feedback** | On / Off (vibration on quiz actions, mobile) |
| **Price multiplier** | 0.5× – 3× (adjust cost estimates per-bar) |

Quick theme toggle in the header cycles through Dark → Dim → Light.

---

## 📱 Install

### As a PWA (recommended)
1. Open the app in Chrome or Safari
2. Tap **"Add to Home Screen"** / **"Install"**
3. Works fully offline after first load

### As an Android APK
An Android wrapper project is included in the `android/` directory.

```bash
cd android
./gradlew assembleDebug
```

The APK is output to `android/app/build/outputs/apk/debug/app-debug.apk`. Transfer to your phone and install (enable "Install from unknown sources" if prompted).

**Requirements:** JDK 17+, Android SDK (API 35)

---

## 🔧 Tech Stack

- **Pure vanilla JavaScript** — zero frameworks, zero build tools, zero dependencies
- **Single HTML page** with view switching
- **CSS custom properties** for dynamic theming
- **localStorage** for all persistence (quiz progress, inventory, settings, scores)
- **Service Worker** with stale-while-revalidate caching for full offline support
- **Android WebView wrapper** via Gradle for APK builds

---

## 📂 Project Structure

```
├── index.html          # Single-page app shell with all view sections
├── styles.css          # Full stylesheet with theme variables
├── app.js              # Core app logic, navigation, modals, theming
├── boot.js             # App bootstrapper and service worker registration
├── drinks.js           # 54-drink recipe database
├── data-extend.js      # Flavor tags, families, ABV, cost data
├── data-spirits.js     # Spirits 101 reference data
├── data-glassware.js   # Glassware guide with SVG illustrations
├── data-garnish.js     # Garnish prep instructions
├── data-mistakes.js    # Common mistakes reference
├── data-ratios.js      # Master ratio templates
├── data-wine-beer.js   # Wine & beer reference
├── data-service.js     # Service scripts for real situations
├── view-browse.js      # Browse drinks view
├── view-quiz.js        # Spaced repetition quiz
├── view-speed.js       # Speed drill game
├── view-ratios.js      # Ratio trainer view
├── view-progress.js    # Progress dashboard
├── view-whatcan.js      # "What Can I Make?" inventory tool
├── view-flavor.js      # Flavor finder filters
├── view-shift.js       # Shift mode quick lookup
├── view-ref.js         # Reference views renderer
├── view-settings.js    # Settings panel
├── sw.js               # Service worker (offline caching)
├── manifest.json       # PWA manifest
├── icon.svg            # App icon
└── android/            # Android APK wrapper project
```

---

## 📄 License

Free to use. Built for bartenders, by bartenders.
