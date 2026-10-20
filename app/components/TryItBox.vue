<script setup lang="ts">
// Box mit Anleitung "Ausprobieren" + Reload-Button.
// Der Inhalt (die einzelnen Schritte) kommt über den Slot von der jeweiligen Seite.
function reloadPage() {
  window.location.reload()
}
</script>

<template>
  <div class="card try-it">
    <span class="label tag tag--ssg">Ausprobieren</span>
    <slot />
    <button type="button" class="btn" @click="reloadPage">Seite neu laden ↻</button>
  </div>
</template>

<style scoped>
.try-it .tag {
  display: inline-block;
}

.btn {
  margin-top: 12px;
}
</style>
