# Team Yellow IoT — www.yellowiot.nl

Website van FTC-team **Yellow IoT #25905**: robot Porcupine verkennen, sponsors vinden en nieuwe teamleden werven.
Gebouwd met [Astro](https://astro.build) als statische site, gehost op Netlify.

## Lokaal draaien

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # bouwt naar dist/
npm run preview   # bekijk de build
```

Node 22.23.4 of nieuwer.

## Waar staat wat?

| Wat | Waar |
| --- | --- |
| Teamgegevens, sponsors, sponsorpakketten, menu | `src/data/site.ts` |
| Onderdelen van Porcupine (naam, uitleg, hotspot-positie, foto's) | `src/data/parts.ts` |
| Pagina's | `src/pages/` (`porcupine/[slug].astro` maakt alle onderdeelpagina's) |
| Kleuren, lettertypes, knoppen | `src/styles/global.css` |
| Robotverkenner op de homepage | `src/components/RobotExplorer.astro` + `src/scripts/explorer.ts` |
| 404-spelletje | `src/pages/404.astro` + `src/scripts/game.ts` |
| Paaseieren (logo 5× klikken, console) | `src/scripts/eggs.ts` |
| Portfolio-PDF en video | `public/portfolio.pdf`, `public/media/` |

## Sponsorbalk bijwerken

De voortgangsbalk op `/sponsors/` leest twee omgevingsvariabelen tijdens de build:

- `SPONSOR_RAISED`: totaal opgehaald bedrag in euro's (standaard `600`)
- `SPONSOR_GOAL`: seizoensdoel in euro's (standaard `3500`)

In Netlify: **Site configuration → Environment variables**, pas de waarde aan en kies daarna **Deploys → Trigger deploy → Deploy site**.
Lokaal testen kan met `SPONSOR_RAISED=1250 npm run build`.

## Formulieren

Het sponsorformulier (`sponsor`) en het aanmeldformulier (`aanmelding`) gebruiken Netlify Forms.
Inzendingen staan in Netlify onder **Forms**; zet daar ook een e-mailmelding naar team@yellowiot.nl aan.

## Nieuwe robotfoto's

```sh
tools/process-photos.sh 2026-season/intake.HEIC intake
```

Dit draait de foto goed, knipt de robot uit (Apple Vision, alleen op macOS) en maakt drie varianten in
`src/assets/robot/`: `-color`, `-duo` (geel/teal duotoon) en `-schem` (blauwdruk). Daarna de foto koppelen in
`src/data/parts.ts`. Nodig: ImageMagick (`brew install imagemagick`) en Xcode command line tools.

## SEO en AI-agents

- Elke pagina heeft een eigen titel, beschrijving, canonical URL en Open Graph-afbeelding (`public/og.jpg`).
- JSON-LD: team (`SportsTeam`), website, onderdelenlijst, FAQ en kruimelpaden.
- `sitemap-index.xml` wordt automatisch gemaakt; `robots.txt` verwijst ernaar.
- `/llms.txt` is een korte samenvatting voor AI-agents, met actuele cijfers uit `site.ts` en de sponsorbalk.
- Oude URL's (`donate.html`, `contact.html`, `thank-you.html`, …) worden in `netlify.toml` doorgestuurd.

## Nog in te vullen

- Uitleg per onderdeel op de onderdeelpagina's (nu placeholders).
- Bedragen van de sponsorpakketten (`price` in `src/data/site.ts`; nu "Bedrag in overleg").
