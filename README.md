# Pokémon Card Finder 🎴

A simple and elegant web application to search for Pokémon cards using the TCGdex API. Supports both English and Japanese card data.

## 🚀 Features
- **Multilingual Support**: Switch between English and Japanese database.
- **Glassmorphism UI**: Beautiful, modern design with smooth animations.
- **Detailed Stats**: View HP, types, attacks, rarity, and more.

## 📖 How to Use
1.  **Select Language**: Click on "English" or "Japanese" at the top.
2.  **Enter ID**: Type the Card ID in the search box.
3.  **Search**: Press Enter or click the Search button.

---

## 🔍 Example IDs

### 🇬🇧 English Cards
- `sv05-020` — Bramblin (Temporal Forces)
- `swsh1-1` — Grookey (Sword & Shield)
- `base1-4` — Charizard (Base Set)
- `sv04-201` — Iron Valiant ex (Paradox Rift)

### 🇯🇵 Japanese Cards (Original)
- `SV4a-349` — リザードンex (Charizard ex - Shiny Treasure ex)
- `SV1S-001` — ニャオハ (Sprigatito - Scarlet ex)
- `SV5M-001` — ウミディグダ (Wiglett - Wild Force)
- `PMCG1-002` — フシギバナ (Venusaur - Base Set JPN)

---

## 🛠️ Technical Details
- **Backend**: Node.js + Express + TypeScript.
- **API**: [TCGdex](https://www.tcgdex.net/).
- **Frontend**: Vanilla HTML5, CSS3, and JavaScript.

## 🏃 Getting Started
1. `npm install`
2. `npx ts-node src/server.ts`
3. Open `http://localhost:3000`
