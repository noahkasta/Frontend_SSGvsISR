<script setup lang="ts">
// Ablauf-Diagramm: Was passiert WO (Build, CDN/Cache, Browser) und WANN?
import type { StrategyKey } from '~/composables/useStrategies'

interface Step {
  where: string
  what: string
}

interface Flow {
  strategy: StrategyKey
  steps: Step[]
}

const flows: Flow[] = [
  {
    strategy: 'ssg',
    steps: [
      { where: 'Build — einmalig', what: 'Daten holen und HTML-Datei erzeugen' },
      { where: 'CDN / Webserver', what: 'liefert nur noch die fertige Datei aus' },
      { where: 'Browser', what: 'bekommt immer dieselbe Version' },
    ],
  },
  {
    strategy: 'isr',
    steps: [
      { where: 'Build', what: 'erzeugt Version 1 der Seite' },
      { where: 'Cache / CDN', what: 'liefert gecachte Version — nach Ablauf: Neu-Erzeugung im Hintergrund' },
      { where: 'Browser', what: 'bekommt die gecachte Version, manchmal kurz veraltet' },
    ],
  },
]
</script>

<template>
  <div v-for="flow in flows" :key="flow.strategy" class="flow">
    <StrategyBadge :strategy="flow.strategy" />
    <div class="steps">
      <template v-for="(step, index) in flow.steps" :key="step.where">
        <div class="step" :class="flow.strategy">
          <span class="label">{{ index + 1 }} / {{ step.where }}</span>
          <span>{{ step.what }}</span>
        </div>
        <span v-if="index < flow.steps.length - 1" class="arrow">→</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.flow {
  margin: 28px 0;
}

.steps {
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-top: 10px;
}

.step {
  flex: 1;
  background: var(--white);
  border: var(--border);
  box-shadow: var(--shadow);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
}

.step.isr {
  box-shadow: 6px 6px 0 var(--yellow), 6px 6px 0 3px var(--black);
}

.arrow {
  align-self: center;
  font-size: 2rem;
  font-weight: 900;
}

/* Auf schmalen Bildschirmen untereinander statt nebeneinander */
@media (max-width: 700px) {
  .steps {
    flex-direction: column;
  }

  .arrow {
    transform: rotate(90deg);
  }
}
</style>
