<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <div class="stats-card">
    <div class="stats-content">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.stats-card {
  background: white;
  border-radius: 24px;
  overflow: hidden;
}


.stats-content {
  padding: 32px;
}

h2 {
  font-size: 1.75rem;
  color: #1a2234;
  margin: 0 0 16px 0;
}

p {
  color: #666;
  margin: 0 0 24px 0;
  line-height: 1.6;
}

:slotted(.stats-image) {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
</style>