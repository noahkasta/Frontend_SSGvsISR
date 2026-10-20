<script setup lang="ts">
// Nummerierte Abschnitts-Überschrift, z. B. "01 — Funktionsweise"
defineProps<{
  number: string
  title: string
}>()
</script>

<template>
  <div class="section-title">
    <span class="number">{{ number }}</span>
    <h2>{{ title }}</h2>
  </div>
</template>

<style scoped>
.section-title {
  display: flex;
  align-items: baseline;
  gap: 16px;
  border-top: var(--border);
  padding-top: 12px;
  margin-top: 72px;
}

.number {
  font-family: var(--font-mono);
  font-weight: 700;
}

h2 {
  margin: 0;
}
</style>
