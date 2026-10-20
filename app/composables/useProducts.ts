export interface Product {
  id: number
  name: string
  price: number
}

export interface ProductsResponse {
  generatedAt: string
  products: Product[]
}

// Holt die Ticket-Daten von unserer Fake-API.
// - callOnce: läuft nur beim Rendern am SERVER (bzw. beim BUILD), der Browser lädt NICHT nochmal.
// - useState: die Daten werden direkt ins ausgelieferte HTML geschrieben.
//   (useFetch würde die Daten bei ISR in eine eigene _payload.json auslagern, die getrennt
//   vom HTML erzeugt wird – dann würden Preise und Uhrzeit nicht zum HTML passen.)
export async function useProducts() {
  const data = useState<ProductsResponse | null>('products', () => null)

  await callOnce('products', async () => {
    data.value = await $fetch('/api/products')
  })

  return { data }
}
