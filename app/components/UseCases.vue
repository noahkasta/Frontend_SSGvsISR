<script setup lang="ts">
// Einsatz-Empfehlung: richtiger Use Case + Gegenbeispiel pro Strategie
import type { StrategyKey } from '~/composables/useStrategies'

interface UseCase {
  strategy: StrategyKey
  good: string
  bad: string
}

const useCases: UseCase[] = [
  {
    strategy: 'ssg',
    good: 'Landingpage der Event-Plattform, Impressum, FAQ, Doku, Blog – ändert sich selten.',
    bad: 'Live-Ticker oder Ticket-Verfügbarkeit – die Seite wäre sofort nach dem Build veraltet.',
  },
  {
    strategy: 'isr',
    good: 'Event-Übersicht mit Ticketpreisen – soll schnell laden, darf aber ein paar Sekunden alt sein.',
    bad: 'Warenkorb oder „Mein Konto“ – personalisiert, jede Person braucht ihre eigene Version.',
  },
]
</script>

<template>
  <div class="use-cases">
    <div v-for="useCase in useCases" :key="useCase.strategy" class="card">
      <StrategyBadge :strategy="useCase.strategy" />
      <div class="row">
        <span class="tag tag--light">Passt</span>
        <p>{{ useCase.good }}</p>
      </div>
      <div class="row">
        <span class="tag tag--alert">Scheitert</span>
        <p>{{ useCase.bad }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.use-cases {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.use-cases .card {
  margin: 0;
}

.row {
  margin-top: 16px;
}

.row p {
  margin: 8px 0 0;
}
</style>
