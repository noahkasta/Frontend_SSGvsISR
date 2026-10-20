// Kleine Hilfsfunktionen zum Formatieren (werden von Nuxt automatisch importiert)

export function formatTime(date: string | Date) {
  return new Date(date).toLocaleTimeString('de-AT', { timeZone: 'Europe/Vienna' })
}

export function formatPrice(price: number) {
  return price.toLocaleString('de-AT', { style: 'currency', currency: 'EUR' })
}
