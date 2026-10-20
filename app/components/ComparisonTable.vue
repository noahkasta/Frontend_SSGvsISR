<script setup lang="ts">
// Vor- und Nachteile: SSG vs. ISR
// rating: good = Vorteil, ok = mit Einschränkung, bad = Nachteil
type Rating = 'good' | 'ok' | 'bad'

interface Cell {
  rating: Rating
  text: string
}

interface Row {
  criterion: string
  ssg: Cell
  isr: Cell
}

const rows: Row[] = [
  {
    criterion: 'Ladezeit / LCP',
    ssg: { rating: 'good', text: 'sehr schnell – fertige Datei vom CDN' },
    isr: { rating: 'good', text: 'sehr schnell – fast immer aus dem Cache' },
  },
  {
    criterion: 'Interaktivität / INP',
    ssg: { rating: 'ok', text: 'hängt vom JavaScript ab (Hydration), nicht von SSG' },
    isr: { rating: 'ok', text: 'hängt vom JavaScript ab (Hydration), nicht von ISR' },
  },
  {
    criterion: 'SEO',
    ssg: { rating: 'good', text: 'fertiges HTML für Crawler' },
    isr: { rating: 'good', text: 'fertiges HTML für Crawler' },
  },
  {
    criterion: 'Aktualität der Daten',
    ssg: { rating: 'bad', text: 'Stand vom letzten Build' },
    isr: { rating: 'ok', text: 'höchstens ca. Intervall-Sekunden alt' },
  },
  {
    criterion: 'Server- / Infrastrukturkosten',
    ssg: { rating: 'good', text: 'kein Server nötig – nur statisches Hosting' },
    isr: { rating: 'ok', text: 'Server/Function nötig, rendert aber selten' },
  },
  {
    criterion: 'Build-Zeit',
    ssg: { rating: 'bad', text: 'wächst mit jeder Seite (10.000 Events = 10.000 Seiten)' },
    isr: { rating: 'good', text: 'einzelne Seiten werden später nachgeneriert' },
  },
  {
    criterion: 'Personalisierte Inhalte',
    ssg: { rating: 'bad', text: 'alle bekommen dieselbe Datei' },
    isr: { rating: 'bad', text: 'alle bekommen dieselbe gecachte Version' },
  },
  {
    criterion: 'Entwicklungsaufwand',
    ssg: { rating: 'good', text: 'am einfachsten – jeder Webserver reicht' },
    isr: { rating: 'ok', text: 'Hosting muss ISR können, Caching verstehen' },
  },
]
</script>

<template>
  <div class="legend">
    <span><RatingMeter rating="good" /> Vorteil</span>
    <span><RatingMeter rating="ok" /> mit Einschränkung</span>
    <span><RatingMeter rating="bad" /> Nachteil</span>
  </div>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Kriterium</th>
          <th><StrategyBadge strategy="ssg" /></th>
          <th><StrategyBadge strategy="isr" /></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.criterion">
          <th>{{ row.criterion }}</th>
          <td>
            <RatingMeter :rating="row.ssg.rating" />
            <span>{{ row.ssg.text }}</span>
          </td>
          <td>
            <RatingMeter :rating="row.isr.rating" />
            <span>{{ row.isr.text }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0 14px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
}

.legend > span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.table-wrapper {
  overflow-x: auto;
  border: var(--border);
  box-shadow: var(--shadow);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--white);
}

th,
td {
  border: 1.5px solid var(--black);
  padding: 12px 14px;
  text-align: left;
  vertical-align: top;
}

thead th {
  background: var(--black);
  color: var(--white);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-transform: uppercase;
}

/* Badges im schwarzen Tabellenkopf brauchen einen hellen Rahmen */
thead .tag {
  border-color: var(--white);
}

tbody th {
  font-weight: 900;
  min-width: 170px;
}

td {
  min-width: 220px;
}

td span {
  display: block;
  margin-top: 6px;
}
</style>
