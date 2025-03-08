<script setup lang="ts">
defineProps<{
  platform: string;
  followers: number;
  description: string;
  gradient?: string;
}>();
</script>

<template>
  <div class="card" ref="cardRef" :style="{ background: gradient || 'linear-gradient(45deg, #42b883, #35495e)' }">
    <h3>{{ platform }}</h3>
    <div class="stats">
      <span>{{ followers.toLocaleString() }} followers</span>
    </div>
    <p>{{ description }}{{ description }}{{ description }}{{ description }}</p>
  </div>
</template>

<style scoped>
.card {
  width: 300px;
  height: 150px;
  flex: 0 0 300px;
  padding: 20px;
  border-radius: 12px;
  color: white;
  margin: 10px;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

h3 {
  margin: 0 0 10px 0;
  font-size: 1.5em;
}

.stats {
  margin-bottom: 10px;
  font-size: 0.9em;
  opacity: 0.9;
}

p {
  margin: 0;
  font-size: 0.9em;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>