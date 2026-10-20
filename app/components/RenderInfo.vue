<script setup lang="ts">
// Zeigt den wichtigsten Vergleich der Demo:
// Wann wurde das HTML erzeugt – und wie spät ist es jetzt im Browser?

const props = defineProps<{
  generatedAt?: string
  // Nur bei ISR: nach wie vielen Sekunden die Seite neu erzeugt wird
  revalidate?: number
}>()

// toRef macht aus der Prop einen Ref, damit der Composable darauf reagieren kann
const { now, ageInSeconds } = usePageAge(toRef(props, 'generatedAt'))

const isStale = computed(() => {
  if (props.revalidate === undefined || ageInSeconds.value === null) {
    return false
  }
  return ageInSeconds.value >= props.revalidate
})
</script>

<template>
  <div class="render-info">
    <div class="tile">
      <span class="label">HTML erzeugt um</span>
      <span class="value">{{ generatedAt ? formatTime(generatedAt) : '--:--:--' }}</span>
      <span class="hint">vom Server bzw. beim Build</span>
    </div>

    <div class="tile">
      <span class="label">Jetzt im Browser</span>
      <span class="value">{{ now ? formatTime(now) : '--:--:--' }}</span>
      <span class="hint">läuft live mit</span>
    </div>

    <div class="tile" :class="{ stale: isStale }">
      <span class="label">Alter der Seite</span>
      <span class="value">{{ ageInSeconds ?? '–' }}<small>s</small></span>
      <span v-if="revalidate !== undefined" class="hint">
        {{ isStale ? 'Veraltet (stale)' : 'Frisch' }} / Intervall {{ revalidate }} s
      </span>
      <span v-else class="hint">wächst bis zum nächsten Build</span>
    </div>
  </div>

  <p v-if="isStale" class="stale-text">
    Die Seite ist älter als {{ revalidate }} s. Beim nächsten Reload bekommst du
    <strong>trotzdem noch diese alte Version</strong> – der Request startet aber im Hintergrund
    die Neu-Erzeugung. Erst der Reload danach zeigt die neue Version.
  </p>
</template>

<style scoped>
.render-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  border: var(--border);
  box-shadow: var(--shadow);
  background: var(--white);
  margin: 32px 0;
}

.tile {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  /* Trennlinie zwischen den Kacheln (auch wenn sie umbrechen) */
  outline: 1.5px solid var(--black);
}

.tile.stale {
  background: var(--yellow);
}

.value {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.value small {
  font-size: 1rem;
  margin-left: 4px;
}

.hint {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-top: 6px;
}

.stale-text {
  background: var(--yellow);
  border: var(--border);
  padding: 12px 16px;
}
</style>
