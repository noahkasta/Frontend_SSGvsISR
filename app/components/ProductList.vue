<script setup lang="ts">
import type { Product } from '~/composables/useProducts'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <ul class="products">
    <li v-for="product in products" :key="product.id">
      <span>{{ product.name }}</span>
      <strong>{{ formatPrice(product.price) }}</strong>
    </li>
  </ul>
</template>

<style scoped>
.products {
  list-style: none;
  padding: 0;
  margin: 0;
}

.products li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  margin: 0;
  border-bottom: 2px solid var(--black);
}

.products li:last-child {
  border-bottom: none;
}

strong {
  font-family: var(--font-mono);
}
</style>
