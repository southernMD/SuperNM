<script setup lang="ts">
import type { MaskCard } from '@/types/Work';

defineProps<{
  overlayDes: Omit<MaskCard, 'msg'>;
  animation: 'levelMove' | 'rotate'
}>();
</script>
<template>
  <div class="hover-card">
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="overlay" :class="{
      'levelMove': animation === 'levelMove',
      'rotate': animation === 'rotate'
    }">
      <div class="overlay-content">
        <p>{{ overlayDes }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-card {
  box-sizing: border-box;
  background: white;
  border-radius: 20px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  height: 100%;
}

:slotted(.txt) {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
  line-height: 1.25rem;
}

:slotted(.txt .title) {
  color: #707a88;
}

:slotted(.txt .des) {
  color: #a3a9b4;
}

.logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  height: 100%;
  background: #2b3647;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: self-start;
  justify-content: self-start;
  padding: 24px;
  border-radius: 20px;
  box-sizing: border-box;
}

.overlay-content {
  color: white;
}

.levelMove:hover {
  animation: levelMove .3s ease;
  opacity: 1;
}

@keyframes levelMove {
  0% {
    transform: translateY(20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.rotate:hover{
  animation: rotate .3s ease;
  opacity: 1;
}

@keyframes rotate {
  0% {
    transform: translateX(-20%) translateY(20%) rotateZ(-10deg);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.overlay-content p {
  color: white;
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
  font-size: 1rem;
  line-height: 1.5;
}
</style>