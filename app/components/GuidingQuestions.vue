<script setup lang="ts">
// Die drei Leitfragen zu Thema B (aus der Recherche-Hilfe) mit Antworten
const questions = [
  {
    question: 'Was passiert bei ISR zwischen dem Ablauf des revalidate-Intervalls und dem Abschluss der Hintergrund-Regenerierung – wer bekommt welche Version?',
    answer: 'Alle bekommen weiterhin die alte (veraltete) Version aus dem Cache. Der erste Request nach Ablauf startet die Neu-Erzeugung, bekommt selbst aber auch noch die alte Version. Erst wenn die neue Seite fertig ist, ersetzt sie die alte im Cache – ab dann bekommen alle die neue. Schlägt die Neu-Erzeugung fehl, bleibt einfach die alte Version im Cache.',
  },
  {
    question: 'Wann scheitert SSG als Strategie?',
    answer: 'Wenn sich Daten oft ändern (Live-Ticker, Lagerbestand), wenn Inhalte personalisiert sind (Login, Warenkorb), wenn die Seite von der Anfrage abhängt (Suche, Filter) oder wenn es so viele Seiten gibt, dass der Build zu lange dauert.',
  },
  {
    question: 'Warum braucht SSG (im Gegensatz zu SSR) zur Laufzeit grundsätzlich keinen Server?',
    answer: 'Bei SSR erzeugt ein Server das HTML bei jeder Anfrage. Bei SSG wurde das HTML schon beim Build fertig erzeugt – zur Laufzeit muss nichts mehr berechnet werden, es werden nur noch Dateien ausgeliefert. Dafür reicht jeder einfache Webserver oder ein CDN (z. B. GitHub Pages).',
  },
]
</script>

<template>
  <div class="questions">
    <details v-for="(item, index) in questions" :key="index">
      <summary>
        <span class="number">Q{{ index + 1 }}</span>
        <span>{{ item.question }}</span>
      </summary>
      <p>{{ item.answer }}</p>
    </details>
  </div>
</template>

<style scoped>
.questions {
  border: var(--border);
  box-shadow: var(--shadow);
  background: var(--white);
}

details {
  border-bottom: 2px solid var(--black);
}

details:last-child {
  border-bottom: none;
}

summary {
  display: flex;
  gap: 16px;
  padding: 16px 20px;
  cursor: pointer;
  font-weight: 700;
  list-style: none;
}

/* Standard-Dreieck ausblenden, stattdessen "+" bzw. "−" rechts */
summary::-webkit-details-marker {
  display: none;
}

summary::after {
  content: '+';
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 1.4rem;
  line-height: 1;
}

details[open] summary {
  background: var(--black);
  color: var(--white);
}

details[open] summary::after {
  content: '−';
}

.number {
  font-family: var(--font-mono);
}

details p {
  margin: 0;
  padding: 16px 20px 20px 62px;
}
</style>
