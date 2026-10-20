<script setup lang="ts">
// Wird gecacht und spätestens nach 10 s im Hintergrund neu gerendert
const { data } = await useProducts()
</script>

<template>
  <PageIntro strategy="isr" />

  <RenderInfo :generated-at="data?.generatedAt" :revalidate="10" />

  <div class="card">
    <span class="label">Ticket-Preise</span>
    <ProductList v-if="data" :products="data.products" />
  </div>

  <TryItBox>
    <ul>
      <li>Innerhalb von 10 s neu laden: <strong>gleiche Version</strong> aus dem Cache.</li>
      <li>Nach mehr als 10 s neu laden: du bekommst <strong>noch die alte Version</strong>, im Terminal erscheint aber ein <code>[API]</code>-Log → die Neu-Erzeugung läuft im Hintergrund.</li>
      <li>Gleich nochmal neu laden: jetzt kommt die <strong>neue Version</strong> mit neuen Preisen.</li>
    </ul>
    <p class="muted">
      Hinweis: Manchmal erscheinen zwei <code>[API]</code>-Logs auf einmal – Nuxt erzeugt neben dem
      HTML auch eine interne Datei (<code>/isr/_payload.json</code>), die ebenfalls gecacht wird.
    </p>
  </TryItBox>
</template>
