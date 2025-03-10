<script setup lang="ts">
withDefaults(defineProps<{
    txt: string;
    link: string;
}>(),{
    link:"#"
})
</script>

<template>
  <span class="topic-tag">
    <a :href="link">{{ txt }}<span class="arrow">↗</span></a>
  </span>
</template>

<style scoped>
.topic-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #1a2234;
  color: #fff;
  border-radius: 100px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.topic-tag:hover {
  background: #2a3244;
}

.arrow {
  font-size: 0.8rem;
  opacity: 0.8;
}
</style>