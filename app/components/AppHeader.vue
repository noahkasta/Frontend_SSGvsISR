<script setup lang="ts">
// Bewusst normale <a>-Links statt <NuxtLink>:
// So lädt der Browser bei jedem Klick die ganze Seite neu und wir sehen
// genau das HTML, das der Server bzw. das CDN ausliefert.
// (Mit NuxtLink würde Nuxt im Browser navigieren und die Daten selbst nachladen.)
const links = [
  { href: '/', label: 'Übersicht' },
  { href: '/ssg', label: 'SSG' },
  { href: '/isr', label: 'ISR' },
  { href: '/live-ticker', label: 'Anti-Pattern' },
]

// Aktuelle Seite, um den aktiven Link hervorzuheben
const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="inner">
      <a href="/" class="logo">SSG/ISR</a>
      <nav>
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :class="{ active: route.path === link.href }"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--black);
  border-bottom: 6px solid var(--yellow);
}

.inner {
  max-width: 1040px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}

.logo {
  color: var(--white);
  font-weight: 900;
  font-size: 1.3rem;
  letter-spacing: -0.03em;
  text-decoration: none;
  padding: 14px 0;
}

nav {
  display: flex;
  flex-wrap: wrap;
}

nav a {
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 18px 14px;
}

nav a:hover {
  background: var(--white);
  color: var(--black);
}

nav a.active {
  background: var(--yellow);
  color: var(--black);
}
</style>
