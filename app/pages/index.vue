<script setup lang="ts">
const { strategies } = useStrategies()
</script>

<template>
  <section class="hero">
    <span class="label">Thema B / Rendering-Strategien</span>
    <h1>Statisch ist<br>das neue <mark>Schnell</mark></h1>
    <p class="lead">
      Alle Rendering-Strategien beantworten dieselbe Frage unterschiedlich:
      <strong>Wann und wo wird das HTML erzeugt?</strong>
      Diese Demo zeigt dieselbe Seite – eine Ticket-Übersicht unserer Event-Plattform – einmal als
      SSG und einmal als ISR.
    </p>
  </section>

  <div class="demo-links">
    <a v-for="strategy in strategies" :key="strategy.key" :href="`/${strategy.key}`" class="demo-link">
      <StrategyBadge :strategy="strategy.key" />
      <strong>{{ strategy.name }}</strong>
      <span class="label">HTML: {{ strategy.when }}</span>
      <span class="go">→</span>
    </a>
    <a href="/live-ticker" class="demo-link">
      <span class="tag tag--alert">Anti-Pattern</span>
      <strong>SSG für einen Live-Ticker</strong>
      <span class="label">So bitte nicht</span>
      <span class="go">→</span>
    </a>
  </div>

  <SectionTitle number="01" title="Funktionsweise" />
  <p>Was passiert wo – und wann?</p>
  <FlowDiagram />

  <SectionTitle number="02" title="ISR-Revalidation" />
  <p>
    Wer bekommt welche Version? Beispiel mit <code>revalidate = 10</code> Sekunden
    (Prinzip „stale-while-revalidate“):
  </p>
  <IsrTimeline />

  <SectionTitle number="03" title="Vor- und Nachteile" />
  <ComparisonTable />

  <SectionTitle number="04" title="Einsatz-Empfehlung" />
  <UseCases />

  <SectionTitle number="05" title="Leitfragen" />
  <GuidingQuestions />

  <SectionTitle number="06" title="Demo starten" />
  <p>
    Die Strategien wirken nur im <strong>Production-Build</strong>. Im Dev-Modus
    (<code>npm run dev</code>) rendert Nuxt jede Seite bei jedem Request neu.
  </p>
  <CodeBlock title="Terminal" code="npm run build        # Build: SSG-Seiten werden jetzt erzeugt
npm run show:build   # zeigt die fertigen HTML-Dateien in .output/public
npm start            # startet den Server auf http://localhost:3000" />
</template>

<style scoped>
.hero {
  padding: 24px 0 8px;
}

.hero h1 {
  font-size: clamp(3rem, 10vw, 6.5rem);
}

mark {
  background: var(--yellow);
  padding: 0 8px;
}

.lead {
  font-size: 1.3rem;
  max-width: 720px;
}

.demo-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.demo-link {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px 24px;
  background: var(--white);
  border: var(--border);
  box-shadow: var(--shadow);
  color: var(--black);
  text-decoration: none;
  font-size: 1.2rem;
}

.demo-link .label {
  margin: 0;
}

.go {
  position: absolute;
  right: 20px;
  bottom: 14px;
  font-size: 1.8rem;
  font-weight: 900;
}

.demo-link:hover {
  transform: translate(3px, 3px);
  box-shadow: 3px 3px 0 var(--black);
  background: var(--yellow);
}
</style>
