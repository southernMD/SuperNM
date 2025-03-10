<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const videos = [
    {
        msg: '/10.jpg',
        title: '真实抽象',
        overlayDes:" elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
    },
    {
        msg: '/10.jpg',
        title: '伪随机',
        overlayDes:" elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
    },
    {
        msg: '/10.jpg',
        title: '神拉上级',
        overlayDes:" elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
    },
    {
        msg: '/10.jpg',
        title: '全网最全',
        overlayDes:" elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non, accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium invento"
    },
];

const topics = [
    {txt:'Skinner Box',link:"#"},
    {txt:'MDA Framework',link:"#"},
    {txt:'Risk & Return',link:"#"},
    {txt:'Game Balance',link:"#"},
    {txt:'Dynamic Adjustment',link:"#"},
    {txt:'Emergent',link:"#"},
    {txt:'Motivation Crowding',link:"#"}
];

const videoCreatorDetails ={
    avatar:"/avatar.png",
    followersNumber:"0",
    viewsNumber:"0"
}

const videoBoxRef = ref()
onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        videoBoxRef.value!.classList.add('video-box-show')
      } else {
        videoBoxRef.value!.classList.remove('video-box-show')
      }
    })
  });
  intersectionObserver.observe(videoBoxRef.value!);
});

</script>

<template>
    <div class="app-container" ref="videoBoxRef">
        <div class="content-grid">
            <div class="main">
                <h1 class="main-title">{{ t("video.title") }}</h1>
                <!-- Profile Section -->
                <div class="profile-section">
                    <div class="profile-header">
                        <img :src="videoCreatorDetails.avatar" :alt="t('name')" class="profile-image">
                        <div class="profile-info">
                            <h2 class="profile-name">{{ t("name") }}<span class="arrow">↗</span></h2>
                            <div class="profile-stats">
                                <span>{{ videoCreatorDetails.followersNumber }} {{ t("video.followers") }}</span>
                                <span>{{ videoCreatorDetails.viewsNumber }} {{ t("video.views")}}</span>
                            </div>
                        </div>
                    </div>

                    <p class="profile-description">
                        {{ t("video.description") }}
                    </p>

                    <div class="topics-section">
                        <h3> {{ t("video.topicsTitle") }}</h3>
                        <div class="topics-grid">
                            <TopicTag v-for="topic in topics" :key="topic" :txt="topic.txt" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="videos-section">
                <div class="videos-grid">
                    <MaskCard 
                        v-for="video in videos" 
                        :key="video.title" 
                        :overlayDes="video.overlayDes"
                        padding="0px"
                        animation="levelMove"
                        >
                        <div :style="{
                            'background-image': `url(${video.msg})`,
                        }" class="img"></div>
                    </MaskCard>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.app-container {
    min-height: 100vh;
    margin: 11rem auto;
    width: 80%;
    box-sizing: border-box;
    opacity: 0;
    transform: translateY(100px) scale(0.8);
    transition: all 1s ease-in-out;
}
.video-box-show{
    transform: translateY(0) scale(1);
    opacity: 1;
}
.main-title {
    font-size: 1.5rem;
    color: #1a2234;
    margin-bottom: 32px;
    white-space: nowrap;
    width: 10px;
}

.content-grid {
    display: grid;
    grid-template-columns: 3fr 5fr;
    gap: 32px;
}

.profile-section {
    background: white;
    border-radius: 24px;
    padding: 32px;
}

.profile-header {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;
}

.profile-image {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
}

.profile-info {
    flex: 1;
}

.profile-name {
    font-size: 1.5rem;
    color: #1a2234;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.arrow {
    font-size: 0.8em;
    opacity: 0.6;
}

.profile-stats {
    display: flex;
    gap: 16px;
    color: #666;
    font-size: 0.9rem;
}

.profile-description {
    color: #333;
    line-height: 1.6;
    margin-bottom: 32px;
}

.topics-section h3 {
    color: #666;
    font-size: 1rem;
    margin-bottom: 16px;
}

.topics-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.videos-section {
    background: white;
    border-radius: 24px;
    padding: 32px;
}

.videos-grid {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(2,minmax(0,1fr));
    grid-template-rows: repeat(2, minmax(0,1fr)); 
    gap: 24px;
}
@media (max-width: 640px) {
  .videos-grid {
    grid-template-columns: 1fr;  
    grid-auto-rows: 1fr;     
  }
}

@media (max-width: 1024px) {
    .content-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .videos-grid {
        grid-template-columns: 1fr;
    }

    .profile-header {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .profile-stats {
        justify-content: center;
    }
}
</style>