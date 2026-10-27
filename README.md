# MedNova — React Website

A React + Vite conversion of the MedNova healthcare education landing page. It includes the animated hero, services, AI assistant section, about section, health library, how-it-works, FAQ, call-to-action, and footer. Sections are included once, and in-page navigation targets existing section IDs.

## Requirements
- Node.js 20+ recommended
- npm
- Internet access for Google Fonts, Material Symbols, Tailwind CDN, and remote image assets

## Run locally
1. Extract the ZIP archive.
2. Open the extracted `mednova-react` folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Project structure
- `index.html` — page metadata, online fonts/icons, Tailwind CDN configuration, and React root
- `src/main.jsx` — React entry point
- `src/App.jsx` — page sections and interactive hero/FAQ behavior
- `src/index.css` — global and animated hero styles
- `vite.config.js` — Vite React configuration

## Online assets
Healthcare images and the existing logo use online URLs. The hero doctor illustration is an inline SVG from the original design. No local image downloads are required.

## Notes
- The hero particle animation responds to pointer movement and respects reduced-motion preferences.
- Navigation uses in-page anchors (for example, `#services` and `#health-library`).
- The site is an educational frontend prototype. It does not connect to a real medical AI service or provide medical diagnosis.
