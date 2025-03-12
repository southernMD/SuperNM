<script setup lang="ts">
import type { MaskCard } from '@/types/Work';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { data } from '@/data'
const { row,cloumn } = data.game

const gameBoxRef = ref()
onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gameBoxRef.value!.classList.add('game-box-show')
      } else {
        gameBoxRef.value!.classList.remove('game-box-show')
      }
    })
  });
  intersectionObserver.observe(gameBoxRef.value!);
});
</script>

<template>
  <div class="app-container box-show" ref="gameBoxRef">
    <div class="section-container">
      <h2 class="section-title">
        <span class="highlight">{{ t("gameList.left.highTitle") }}</span><span>{{t("gameList.left.title")}}</span>
      </h2>
      <div class="game-grid game-jam-grid">
        <MaskCard v-for="game in cloumn" :overlay-des="game.overlayDes" padding="0px" animation="levelMove">
          <div :style="{
            'background-image': `url(${game.msg})`,
            'min-height': `${game.minHeight}`
          }" class="img"></div>
        </MaskCard>
      </div>
    </div>
    <div class="code-and-game">
      <div class="section-container">
        <h2 class="section-title">
          <span class="highlight">{{t("gameList.right.highTitle")}}</span> <span>{{t("gameList.right.title")}}</span>
        </h2>
        <div class="game-grid company-grid">
          <MaskCard v-for="game in row" :overlay-des="game.overlayDes" padding="0px" animation="levelMove">
            <div :style="{
              'background-image': `url(${game.msg})`,
              'min-height': `${game.minHeight}`
            }" class="img"></div>
          </MaskCard>
        </div>
      </div>
      <div class="code-section">
        <h2 class="section-title code-title">
          <span class="highlight">Game</span> + <span class="highlight code">Code</span>
        </h2>
      </div>
    </div>

  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 80%;
  margin: 11rem auto;
  display: grid;
  gap: 24px;
}
.box-show{
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transition: all 1s ease-in-out;
}

.game-box-show {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.section-container {
  background: white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bolder;
  color: #333;
  margin-bottom: 24px;
  white-space: nowrap;
  width: 100%;
}

.highlight {
  color: var(--font-color);
}

.highlight.code {
  color: #ff6b00;
}

.game-grid {
  display: grid;
  gap: 12px;
  flex: 1;
}

.game-jam-grid {
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: auto;
}

.company-grid {
  grid-template-columns: repeat(2, 1fr);
}

.code-section {
  background: #2d3748;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  display: none;
  height: 100%;
}

.code-title {
  color: white;
  text-align: center;
  font-size: 3rem;
}

.code-and-game {
  display: grid;
  gap: 24px;
}

@media (max-width: 768px) {

  .game-jam-grid,
  .company-grid {
    grid-template-columns: 1fr;
  }

  .game-jam-grid> :last-child {
    grid-column: auto;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .code-title {
    font-size: 2rem;
  }
}

@media (min-width: 768px) {
  .app-container {
    grid-template-columns: 35% 1fr;
  }

  .code-and-game {
    grid-template-rows: 7fr 3fr;
  }

  .code-section {
    display: flex;
  }
}
</style>