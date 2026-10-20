<script setup lang="ts">
// ANTI-PATTERN: Ein Live-Ticker als SSG-Seite.
// Der Spielstand wird einmal beim Build abgefragt und danach nie wieder.
const { data: buildScore } = await useFetch('/api/ticker')

// Zum Vergleich: den echten, aktuellen Stand im Browser holen
interface TickerData {
  generatedAt: string
  minute: number
  home: number
  away: number
}
const liveScore = ref<TickerData | null>(null)

async function loadLiveScore() {
  liveScore.value = await $fetch('/api/ticker')
}
</script>

<template>
  <section>
    <span class="tag tag--alert">Anti-Pattern</span>
    <h1>SSG für einen Live-Ticker</h1>
    <p class="lead">
      Diese Seite ist mit <code>prerender: true</code> konfiguriert – also SSG. Der Spielstand
      ändert sich aber jede Minute. Die ausgelieferte Seite zeigt deshalb für immer den Stand vom
      Build.
    </p>
  </section>

  <div class="compare">
    <ScoreBoard
      v-if="buildScore"
      label="Ausgeliefertes HTML / Stand vom Build"
      :home="buildScore.home"
      :away="buildScore.away"
      :minute="buildScore.minute"
      :generated-at="buildScore.generatedAt"
      :outdated="liveScore !== null && liveScore.minute !== buildScore.minute"
    />

    <ScoreBoard
      v-if="liveScore"
      label="Echter Stand / jetzt im Browser geholt"
      :home="liveScore.home"
      :away="liveScore.away"
      :minute="liveScore.minute"
      :generated-at="liveScore.generatedAt"
    />
    <div v-else class="placeholder">
      <button type="button" class="btn btn--alert" @click="loadLiveScore">Echten Stand laden</button>
    </div>
  </div>

  <div class="card">
    <span class="label">Warum ist das falsch – und was wäre besser?</span>
    <ul>
      <li><strong>SSG:</strong> Daten sind sofort nach dem Build veraltet → falsch für Live-Daten.</li>
      <li><strong>ISR mit <code>revalidate: 1</code>:</strong> auch keine Lösung – dann wird fast bei jeder Anfrage neu erzeugt und der Cache-Vorteil von ISR ist weg (zweites Anti-Pattern).</li>
      <li><strong>Besser:</strong> Die Seite statisch ausliefern und nur den Spielstand im Browser live nachladen (z. B. per Polling oder WebSocket) – oder eine Strategie wählen, die pro Request rendert.</li>
    </ul>
  </div>
</template>

<style scoped>
.lead {
  font-size: 1.25rem;
  max-width: 720px;
}

.compare {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0;
}

.placeholder {
  border: 3px dashed var(--black);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
}
</style>
