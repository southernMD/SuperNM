<script setup lang="ts">
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const followersNNumber = 789222
const followers = ref(0)
const followersRef = ref()
const followersFormat = computed(() => {
  return followers.value.toLocaleString()
})
const bgRef = ref()
onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    let requestAnimationFrameId: number
    const addRandomFollowers = () => {
      if (followers.value < followersNNumber) {
        const randomNum = Math.floor(Math.random() * 1000) + 1;
        followers.value = Math.min(followers.value + randomNum, followersNNumber);
        requestAnimationFrameId = requestAnimationFrame(addRandomFollowers);
      } else {
        cancelAnimationFrame(requestAnimationFrameId);
      }
    };
    addRandomFollowers(); // 开始添加随机数
    intersectionObserver.disconnect()
  });
  // 开始监听
  intersectionObserver.observe(followersRef.value);
})

onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;

    // 初始化背景大小
    bgRef.value.style.backgroundSize = '0% 100%';
    let val = 0;
    let requestAnimationFrameId: number;

    const draw = () => {
      if (val <= 100) {
        bgRef.value.style.backgroundSize = `${val}% 100%`; // 更新背景大小
        val++; // 增加值
        requestAnimationFrameId = requestAnimationFrame(draw); // 继续动画
      } else {
        cancelAnimationFrame(requestAnimationFrameId); // 动画结束
      }
    };

    draw(); // 开始动画
    intersectionObserver.disconnect();
  });
  intersectionObserver.observe(bgRef.value);
})

const topCards = [
  {
    platform: 'Bilibili',
    followers: 14392,
    description: 'I\'m not only playing games. I treat video games as an experiment. Through games, I study behavioral psychology, product design, decision making, and aesthetics.',
    gradient: 'linear-gradient(45deg, #FB7299, #FC9DB6)'
  },

];

const bottomCards = [
  {
    platform: 'YouTube',
    followers: 17000,
    description: 'Gaming and tech tutorials with in-depth analysis and guides.',
    gradient: 'linear-gradient(45deg, #FF0000, #282828)'
  },
  {
    platform: 'Discord',
    followers: 5000,
    description: 'Join our community of tech enthusiasts and gamers.',
    gradient: 'linear-gradient(45deg, #7289DA, #424549)'
  },
  {
    platform: 'Instagram',
    followers: 8500,
    description: 'Daily tech insights and behind-the-scenes moments.',
    gradient: 'linear-gradient(45deg, #833AB4, #FD1D1D)'
  }
];
</script>

<template>
  <div class="carouselList">
    <div class="msgBox">
      <p>{{ t("carouselList.ms1") }}</p>
      <div>
        <p>{{ t("carouselList.ms2.numberBefore") }}</p><strong ref="followersRef">{{ followersFormat }}</strong>
        <p>{{ t("carouselList.ms2.numberEnd") }}</p>
      </div>
      <p class="bg" ref="bgRef">{{ t("carouselList.ms3") }}</p>
    </div>
    <div class="lists-container">
      <ScrollingCardList 
        :cards="topCards" 
        direction="left"
        :speed="8000"
        class="list"
      />
      <ScrollingCardList 
        :cards="bottomCards" 
        direction="right"
        :speed="8000"
        class="list"
      />
    </div>
  </div>
</template>

<style scoped>
.carouselList {
  height: 100vh;
  width: 90%;
  margin: 11rem auto 0 auto;
}

.msgBox {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  /* 使内容垂直居中 */
}

.msgBox>* {
  margin-bottom: 1rem;
  line-height: 2rem;
}

.msgBox div {
  display: flex;
  align-items: end;
}

.msgBox strong {
  font-size: 36px;
  margin: 0 1rem 0 1rem;
  text-align: center;
  color: var(--font-color);
  font-weight: bolder;
}

.msgBox p {
  font-size: 24px;
  /* 放大文本 */
}

.msgBox .bg {
    background-repeat:no-repeat;
    background-image: linear-gradient(to right,var(--font-color),var(--font-color));
    border-radius: .5rem;
    padding: 0 .5rem 0 .5rem;
}

.lists-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list {
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>