<script setup lang="ts">
import type { StrategyKey } from '~/composables/useStrategies'

const props = defineProps<{
  strategy: StrategyKey
}>()

const { getStrategy } = useStrategies()
const info = getStrategy(props.strategy)
</script>

<template>
  <section>
    <StrategyBadge :strategy="strategy" />
    <h1>{{ info.name }}</h1>
    <p class="idea">{{ info.idea }}</p>

    <div class="facts">
      <div>
        <span class="label">HTML wird erzeugt</span>
        <strong>{{ info.when }}</strong>
      </div>
    </div>

    <CodeBlock title="nuxt.config.ts → routeRules" :code="info.config" />
  </section>
</template>

<style scoped>
.idea {
  font-size: 1.25rem;
  max-width: 720px;
}

.facts {
  border-left: 6px solid var(--black);
  padding-left: 14px;
  margin: 24px 0;
}

.facts .label {
  margin-bottom: 2px;
}
</style>
