# SSG & ISR – Statisch ist das neue Schnell

Demo für den Flipped Classroom (Thema B). Dieselbe Seite (Ticket-Preise einer Event-Plattform)
wird einmal als SSG und einmal als ISR ausgeliefert, damit man den Unterschied direkt sieht:

| Seite          | Strategie | HTML wird erzeugt …                     |
| -------------- | --------- | --------------------------------------- |
| `/ssg`         | SSG       | einmal beim Build                       |
| `/isr`         | ISR       | beim Build + alle 10 s im Hintergrund   |
| `/live-ticker` | SSG       | Anti-Pattern: Live-Daten als SSG        |
| `/`            | SSG       | Übersicht, Diagramme, Vor-/Nachteile    |

Festgelegt wird das in `nuxt.config.ts` unter `routeRules`.

## Demo starten

Die Strategien wirken **nur im Production-Build**. `npm run dev` rendert jede Seite bei jedem
Request neu – dafür also nicht verwenden.

```sh
npm install
npm run build        # SSG-Seiten werden JETZT erzeugt (siehe [API]-Logs im Terminal)
npm run show:build   # listet die fertigen HTML-Dateien in .output/public
npm start            # Server auf http://localhost:3000
```

Im Terminal erscheint bei jedem Aufruf der Fake-API ein `[API] ...`-Log. Daran sieht man,
wann der Server wirklich arbeitet:

- **SSG**: nur während `npm run build`, danach nie wieder
- **ISR**: beim ersten Aufruf und dann höchstens einmal pro 10 s

## Hinweis zu ISR

Lokal (Node-Server) heißt die Regel `swr: 10` (stale-while-revalidate). Auf Vercel/Netlify
schreibt man `isr: 10`. Das Prinzip ist dasselbe: Nach Ablauf bekommt der nächste Request
noch die alte Version und startet die Neu-Erzeugung im Hintergrund.

## Projektstruktur

```
nuxt.config.ts            routeRules: welche Seite welche Strategie nutzt
server/api/
  products.get.ts         Fake-API: Tickets mit zufälligen Preisen + Zeitstempel
  ticker.get.ts           Fake-API: Spielstand für das Anti-Pattern
app/
  pages/                  index, ssg, isr, live-ticker
  components/
    RenderInfo.vue        "HTML erzeugt um" vs. "Jetzt im Browser" + Alter der Seite
    PageIntro.vue         Badge, Kernidee, Konfiguration der Strategie
    SectionTitle.vue      nummerierte Abschnitts-Überschrift
    RatingMeter.vue       3-Kästchen-Anzeige (Vorteil / Einschränkung / Nachteil)
    ProductList.vue       Ticket-Preise
    TryItBox.vue          Anleitung "Ausprobieren" + Reload-Button
    FlowDiagram.vue       Ablauf: was passiert wo (Build, CDN, Server, Browser)?
    IsrTimeline.vue       ISR-Revalidation: wer bekommt welche Version?
    ComparisonTable.vue   Vor-/Nachteile (LCP, INP, SEO, Kosten, Aufwand …)
    UseCases.vue          Einsatz-Empfehlung + Gegenbeispiel
    GuidingQuestions.vue  Antworten auf die drei Leitfragen
  composables/
    useProducts.ts        lädt die Tickets beim Rendern am Server/Build
    useNow.ts             aktuelle Browser-Uhrzeit (jede Sekunde)
    usePageAge.ts         wie alt ist das HTML der Seite?
    useStrategies.ts      Texte zu SSG/ISR an einer zentralen Stelle
```

## Technische Hinweise

- Nuxt 4.3, weil neuere Versionen Node ≥ 22.22 voraussetzen.
- `.npmrc` (`legacy-peer-deps`) umgeht einen Bug in npm 10.9 beim Installieren.
- `overrides.unstorage` in `package.json`: neuere unstorage-Versionen brechen den Build
  der Startseite `/` in Nuxt 4.3.
