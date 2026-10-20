// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-10-01',
  devtools: { enabled: false },
  css: ['~/assets/main.css'],

  // Hier wird pro Seite festgelegt, WANN das HTML erzeugt wird.
  // Achtung: Das wirkt nur im Production-Build (npm run build + npm start),
  // im Dev-Modus (npm run dev) wird jede Seite bei jedem Request neu gerendert.
  routeRules: {
    // SSG: Das HTML wird EINMAL beim Build erzeugt und als Datei gespeichert
    '/': { prerender: true },
    '/ssg': { prerender: true },
    '/live-ticker': { prerender: true },

    // ISR: Die Seite wird gecacht und nach 10 Sekunden im Hintergrund neu erzeugt.
    // Lokal (Node-Server) heißt das "swr" (stale-while-revalidate).
    // Auf Vercel oder Netlify würde man stattdessen { isr: 10 } schreiben.
    '/isr': { swr: 10 },
  },
})
