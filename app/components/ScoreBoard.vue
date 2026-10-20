<script setup lang="ts">
defineProps<{
  label: string
  home: number
  away: number
  minute: number
  generatedAt: string
  // true = Stand ist veraltet (wird rot markiert)
  outdated?: boolean
}>()
</script>

<template>
  <div class="scoreboard" :class="{ outdated }">
    <span class="label">{{ label }}</span>
    <span class="score">Wien {{ home }}:{{ away }} Graz</span>
    <span class="meta">{{ minute }}. Minute / Stand {{ formatTime(generatedAt) }}</span>
  </div>
</template>

<style scoped>
.scoreboard {
  border: var(--border);
  box-shadow: var(--shadow);
  background: var(--white);
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.scoreboard.outdated {
  background: var(--red);
  color: var(--white);
}

.score {
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
}

.meta {
  font-family: var(--font-mono);
  font-size: 0.85rem;
}
</style>
