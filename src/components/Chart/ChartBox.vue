<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t, tm } = useI18n();
import { vElementSize } from '@vueuse/components'
import { onMounted, ref } from 'vue';
import { computed } from 'vue';
import { useDevicePixelRatio } from '@vueuse/core'
const { pixelRatio } = useDevicePixelRatio()

// import MapSVG from '@/assets/map.svg?component'
const svgWidth = ref(0)
const svgHeight = computed(() => Math.ceil(svgWidth.value * 0.7))
const radarWidth = ref(0)
const earthWidth = ref(0)
const earthHeight = computed(() => Math.ceil(earthWidth.value * 0.7))
const onResize = ({ width }: { width: number, height: number }) => {
  svgWidth.value = width - 64
}
const onResizeRadar = ({ width }: { width: number, height: number }) => {
  radarWidth.value = width - 64
}

const onResizeEarth = ({ width }: { width: number, height: number }) => {
  earthWidth.value = width - 64
}

const ChartCardBoxRef = ref<HTMLElement>()
onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                ChartCardBoxRef.value!.classList.add('chart-card-box-show')
                // 在这里添加元素进入视口时的逻辑
            } else {
                ChartCardBoxRef.value!.classList.remove('chart-card-box-show')
                // 在这里添加元素离开视口时的逻辑
            }
        })
    });
    intersectionObserver.observe(ChartCardBoxRef.value!);
})
</script>

<template>
  <div class="app-container" ref="ChartCardBoxRef">
    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="top">
        <StatsCard :title="t('chart.stackChart.title')" :description="t('chart.stackChart.description')"
          v-element-size="onResize">
          <Chart :width="svgWidth" :height="svgHeight"></Chart>
        </StatsCard>
        <div class="right">
          <StatsCard 
            v-element-size="onResizeEarth"
            :title="t('chart.space.title')"
            :description="t('chart.space.description') + t('chart.space.livePlace')">
            <div >
              <Earth :width="earthWidth" :height="earthHeight" :pixelRatio="pixelRatio"></Earth>
            </div>
          </StatsCard>
          <div class="code-section">
            <div class="section-title">
              Statistics
            </div>
          </div>
        </div>
      </div>
      <div class="bootom">
        <StatsCard v-for="stat in tm('chart.radar')" :key="stat.title" v-bind="stat" v-element-size="onResizeRadar">
          <Radar :width="radarWidth" :height="400" :data="stat.data"></Radar>
        </StatsCard>
      </div>
    </div>
  </div>
</template>

<style>

.app-container {
  padding: 40px 20px;
  background: #f5f5f5;
  width: 80%;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transition:all 1s ease-in-out ;
}
.chart-card-box-show{
    transform: translateY(0) scale(1);
    opacity:1
}
.right{
  display: grid;
  gap: 36px;
}
.code-section {
  background: #2d3748;
  border-radius: 2em;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.section-title {
  font-size:4rem;
  font-weight: bolder;
  color: #ff6b00;
  margin-bottom: 24px;
  white-space: nowrap;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
}

.stats-grid {
  display: grid;
  gap: 32px;
}

.top {
  display: grid;
  gap: 32px;
  grid-template-columns: 4fr 2.5fr;
}

.bootom {
  display: grid;
  gap: 32px;
  grid-template-columns: 1fr 1fr;
}

@media (max-width: 1024px) {
    .code-section {
      display: none;
    }
    .stats-grid {
      grid-template-columns: 1fr;
    }
    .top{
      grid-template-columns: 1fr;
    }
    .bootom{
      grid-template-columns: 1fr;
    }
}

</style>