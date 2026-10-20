<script setup lang="ts">
// Zeitleiste: Wer bekommt bei ISR (revalidate = 10 s) welche Version?
interface TimelineEntry {
  time: string
  text: string
  version: 'v1' | 'v2' | null
  stale?: boolean
}

const entries: TimelineEntry[] = [
  { time: '0 s', text: 'Build erzeugt Version 1 und legt sie in den Cache', version: null },
  { time: '3 s', text: 'Besucherin A fragt an', version: 'v1' },
  { time: '8 s', text: 'Besucher B fragt an', version: 'v1' },
  { time: '10 s', text: 'Intervall abgelaufen – es passiert aber noch nichts', version: null },
  { time: '14 s', text: 'Besucherin C fragt an → bekommt die alte Version UND startet die Neu-Erzeugung im Hintergrund', version: 'v1', stale: true },
  { time: '14,5 s', text: 'Besucher D fragt an, während noch neu erzeugt wird', version: 'v1', stale: true },
  { time: '15 s', text: 'Version 2 ist fertig und ersetzt Version 1 im Cache', version: null },
  { time: '16 s', text: 'Besucherin E fragt an', version: 'v2' },
]
</script>

<template>
  <div class="legend">
    <span class="version">Frisch</span>
    <span class="version stale">Veraltet</span>
  </div>

  <ol class="timeline">
    <li v-for="entry in entries" :key="entry.time" :class="{ event: !entry.version }">
      <span class="time">{{ entry.time }}</span>
      <span class="text">{{ entry.text }}</span>
      <span v-if="entry.version" class="version" :class="{ stale: entry.stale }">
        {{ entry.version }} {{ entry.stale ? 'veraltet' : 'frisch' }}
      </span>
    </li>
  </ol>
</template>

<style scoped>
.legend {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  border: var(--border);
  box-shadow: var(--shadow);
  background: var(--white);
}

.timeline li {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 0;
  border-bottom: 2px solid var(--black);
}

.timeline li:last-child {
  border-bottom: none;
}

/* Zeilen ohne Besucher (Build, Ablauf, fertig) sind System-Ereignisse */
.timeline li.event {
  background: var(--paper);
  font-style: italic;
}

.time {
  min-width: 70px;
  font-family: var(--font-mono);
  font-weight: 700;
}

.text {
  flex: 1;
  min-width: 220px;
}

.version {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid var(--black);
  padding: 2px 8px;
  background: var(--black);
  color: var(--white);
}

/* veraltet = gelb-schwarz gestreift (wie ein Warnschild) */
.version.stale {
  color: var(--black);
  background: repeating-linear-gradient(
    -45deg,
    var(--yellow) 0 6px,
    var(--white) 6px 12px
  );
}
</style>
