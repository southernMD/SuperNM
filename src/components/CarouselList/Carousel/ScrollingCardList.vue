<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import Card from './ScrollingCard.vue';
import 'swiper/css';
import { nextTick, ref, type Ref } from 'vue';
import { onMounted } from 'vue';

const props = defineProps<{
  cards: Array<scrollingCard>;
  direction?: 'left' | 'right';
  speed?: number;
}>();


const swiperConfig = {
  observer: true,
  modules: [Autoplay],
  loop: true,
  speed: props.speed,
  allowTouchMove: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: props.direction === 'left',
  },
  grabCursor: true,
  centeredSlides: true,
  freeMode:true,
  breakpoints: {
    320:{
      slidesPerView: 2,
    },
    500:{
      slidesPerView: 3,
      spaceBetween: 20,
    },
    750: {  //当屏幕宽度大于等于320
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200:{
      slidesPerView: 4,
      spaceBetween: 20,
    }
  }
};

const ScrollingCardsRef: Ref<InstanceType<typeof SwiperSlide>[]> = ref([]);
const containerRef = ref();
const cardShow: Ref<Array<typeof props.cards[number]>> = ref([]);

const updateCardShow = () => {
  const width = containerRef.value!.clientWidth;
  cardShow.value.push(...structuredClone(props.cards));
  nextTick(() => {
    while (ScrollingCardsRef.value[0]?.$el.clientWidth * cardShow.value.length < width || cardShow.value.length < 8) {
      cardShow.value.push(...structuredClone(props.cards));
    }
  });
};

onMounted(() => {
  updateCardShow();
});
</script>

<template>
  <div class="scrolling-container" ref="containerRef">
    <Swiper v-bind="swiperConfig" class="swiper-container">
      <SwiperSlide ref="ScrollingCardsRef" v-for="(card, index) in cardShow" :key="`${index}-${card.platform}`"
        class="swiper-slide">
        <Card v-bind="card" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped>
.scrolling-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);
  -webkit-mask-image: linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);
}

.swiper-container {
  padding-bottom: 10px;
}

.swiper-slide {
  width: 340px !important;
  /* 计算宽度，确保间隙 */
  transition: transform 0.3s;
}

:deep(.swiper-wrapper) {
  transition-timing-function: linear !important;
}
</style>