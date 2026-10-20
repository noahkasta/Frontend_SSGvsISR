// Berechnet, wie alt das HTML der Seite ist (in Sekunden).
// generatedAt = Zeitpunkt, an dem der Server/Build die Seite erzeugt hat.
export function usePageAge(generatedAt: Ref<string | undefined>) {
  const now = useNow()

  const ageInSeconds = computed(() => {
    if (!now.value || !generatedAt.value) {
      return null
    }
    const diff = now.value.getTime() - new Date(generatedAt.value).getTime()
    return Math.max(0, Math.floor(diff / 1000))
  })

  return { now, ageInSeconds }
}
