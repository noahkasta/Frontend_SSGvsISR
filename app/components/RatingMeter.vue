<script setup lang="ts">
// Anzeige statt Emoji: 3 Kästchen, je mehr gefüllt, desto besser.
// good = 3 (Vorteil), ok = 2 (mit Einschränkung), bad = 1 (Nachteil)
type Rating = 'good' | 'ok' | 'bad'

const props = defineProps<{
  rating: Rating
}>()

const filledCount = computed(() => {
  if (props.rating === 'good') return 3
  if (props.rating === 'ok') return 2
  return 1
})

const labels: Record<Rating, string> = {
  good: 'Vorteil',
  ok: 'Mit Einschränkung',
  bad: 'Nachteil',
}
</script>

<template>
  <span class="meter" :class="rating" :title="labels[rating]" :aria-label="labels[rating]">
    <span v-for="n in 3" :key="n" class="box" :class="{ filled: n <= filledCount }" />
  </span>
</template>

<style scoped>
.meter {
  display: inline-flex;
  gap: 3px;
  vertical-align: middle;
}

.box {
  width: 12px;
  height: 12px;
  border: 2px solid var(--black);
  background: var(--white);
}

.box.filled {
  background: var(--black);
}

/* Nachteil zusätzlich rot markieren */
.bad .box.filled {
  background: var(--red);
}
</style>
