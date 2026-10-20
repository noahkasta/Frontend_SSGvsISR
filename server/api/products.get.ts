// Fake-API: liefert Event-Tickets mit zufälligen Preisen.
// Der Zeitstempel "generatedAt" zeigt, WANN die Daten abgefragt wurden.

function randomPrice(min: number, max: number) {
  const price = min + Math.random() * (max - min)
  return Math.round(price * 100) / 100
}

export default defineEventHandler(() => {
  const now = new Date()

  // Dieser Log erscheint im Terminal – so sieht man, wann der Server wirklich arbeitet
  console.log(`[API] /api/products aufgerufen um ${now.toLocaleTimeString('de-AT')}`)

  return {
    generatedAt: now.toISOString(),
    products: [
      { id: 1, name: 'Festival-Pass (3 Tage)', price: randomPrice(150, 250) },
      { id: 2, name: 'Konzert-Ticket', price: randomPrice(40, 90) },
      { id: 3, name: 'Theater – 1. Reihe', price: randomPrice(60, 120) },
      { id: 4, name: 'Frontend-Workshop', price: randomPrice(20, 50) },
    ],
  }
})
