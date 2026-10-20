<script setup lang="ts">
import type { StrategyKey } from '~/composables/useStrategies'

defineProps<{
  strategy: StrategyKey
}>()
</script>

<template>
  <span class="tag" :class="`tag--${strategy}`">{{ strategy }}</span>
</template>
