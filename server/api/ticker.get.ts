// Fake-API für einen Live-Ticker: Der Spielstand ändert sich jede Minute.
// Damit zeigen wir das Anti-Pattern "SSG für Live-Daten".

export default defineEventHandler(() => {
  const now = new Date()
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes()

  // Spielminute 1–90, Tore steigen im Lauf des Spiels
  const minute = (minutesSinceMidnight % 90) + 1
  const home = Math.floor(minute / 25)
  const away = Math.floor(minute / 35)

  console.log(`[API] /api/ticker aufgerufen um ${now.toLocaleTimeString('de-AT')}`)

  return {
    generatedAt: now.toISOString(),
    minute,
    home,
    away,
  }
})
