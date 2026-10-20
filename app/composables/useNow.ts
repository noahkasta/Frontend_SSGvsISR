// Liefert die aktuelle Uhrzeit des BROWSERS und aktualisiert sie jede Sekunde.
// Startet erst in onMounted, also nur im Browser (am Server gibt es keine "laufende" Uhr).
export function useNow() {
  const now = ref<Date | null>(null)
  let timer: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    now.value = new Date()
    timer = setInterval(() => {
      now.value = new Date()
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return now
}
