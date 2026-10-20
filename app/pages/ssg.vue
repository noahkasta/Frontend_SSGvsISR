<script setup lang="ts">
// Wird beim BUILD einmal gerendert – die Daten werden also nur zur Build-Zeit geladen
const { data } = await useProducts()
</script>

<template>
  <PageIntro strategy="ssg" />

  <RenderInfo :generated-at="data?.generatedAt" />

  <div class="card">
    <span class="label">Ticket-Preise</span>
    <ProductList v-if="data" :products="data.products" />
  </div>

  <TryItBox>
    <ul>
      <li>Lade die Seite neu: <strong>„HTML erzeugt um“ und die Preise ändern sich nie</strong> – nur das Alter wächst.</li>
      <li>Im Terminal erscheint <strong>kein</strong> <code>[API]</code>-Log – der Server arbeitet nicht.</li>
      <li>Die fertige Datei liegt nach dem Build unter <code>.output/public/ssg/index.html</code>.</li>
      <li>Neue Daten gibt es erst mit einem neuen <code>npm run build</code>.</li>
    </ul>
  </TryItBox>
</template>
