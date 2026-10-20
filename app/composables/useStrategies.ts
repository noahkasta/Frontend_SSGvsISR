// Zentrale Beschreibung der beiden Rendering-Strategien.
// Wird von mehreren Components verwendet, damit die Texte nur an EINER Stelle stehen.

export type StrategyKey = 'ssg' | 'isr'

export interface Strategy {
  key: StrategyKey
  short: string
  name: string
  when: string
  idea: string
  config: string
}

const strategies: Record<StrategyKey, Strategy> = {
  ssg: {
    key: 'ssg',
    short: 'SSG',
    name: 'Static Site Generation',
    when: 'einmal beim Build',
    idea: 'Die Seite wird einmal beim Build als fertige HTML-Datei erzeugt und danach nur noch ausgeliefert – egal wie viele Besucher kommen.',
    config: `'/ssg': { prerender: true }`,
  },
  isr: {
    key: 'isr',
    short: 'ISR',
    name: 'Incremental Static Regeneration',
    when: 'beim Build + alle 10 s im Hintergrund neu',
    idea: 'Wie SSG, aber nach Ablauf eines Intervalls wird die Seite im Hintergrund neu erzeugt – ohne den ganzen Build zu wiederholen.',
    config: `'/isr': { swr: 10 }   // auf Vercel/Netlify: { isr: 10 }`,
  },
}

export function useStrategies() {
  function getStrategy(key: StrategyKey) {
    return strategies[key]
  }

  return {
    strategies: Object.values(strategies),
    getStrategy,
  }
}
