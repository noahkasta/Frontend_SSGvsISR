<script setup lang="ts">
defineProps<{
  code: string
  // optionale Beschriftung über dem Code, z. B. der Dateiname
  title?: string
}>()
</script>

<template>
  <div class="code-block">
    <span v-if="title" class="title">{{ title }}</span>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  border: var(--border);
  box-shadow: var(--shadow);
  margin: 16px 0;
}

.title {
  display: block;
  background: var(--white);
  border-bottom: var(--border);
  padding: 6px 14px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 700;
}

pre {
  margin: 0;
  background: var(--black);
  color: var(--white);
  padding: 16px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

pre code {
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}
</style>
