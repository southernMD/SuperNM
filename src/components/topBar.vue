<script setup lang="ts">
import { ref } from 'vue';
import { useI18n} from 'vue-i18n';
import { useLanguageStore } from '@/store/index'; 
import { data } from '@/data';
const { github,x,bilibili,twitch } = data.topBarLink
const { locale,t,tm } = useI18n();
const drawerVisible = ref(false);
const isDesktop = ref(window.innerWidth > 768); // 判断是否为桌面设备
const languageStore = useLanguageStore(); 

window.addEventListener('resize', () => {
  isDesktop.value = window.innerWidth > 768; // 更新判断
  if (isDesktop.value) {
    drawerVisible.value = false; // 如果是桌面设备，则关闭抽屉
  }
});

function changeLanguage() {
  languageStore.toggleLanguage();
  locale.value = locale.value === 'zh' ? 'en' : 'zh';
}

const goHash = (hash:string)=>{
  window.location.href = hash
  drawerVisible.value = false
}
</script>

<template>
  <header class="top-bar">
    <div class="nav-links">
      <a class="logo">{{ t("name") }}</a>
      <div v-for="(item, index) in tm('topNav')" :key="index">
        <a :href="item.hash">{{ item.title }}</a>
      </div>
    </div>
    <i class="icon-caidan iconfont" style="cursor: pointer;" v-if="!isDesktop" @click="drawerVisible = true"></i>
    <el-drawer v-model="drawerVisible" :title="t('name')" size="50%" append-to-body direction="ltr" :show-close="false">
      <div class="drawer-content">
        <div class="nav-list-phone">
          <div class="nav" v-for="(item, index) in tm('topNav')" :key="index" @click="goHash(item.hash)">
            <a>{{ item.title }}</a>
          </div>
        </div>
      </div>
    </el-drawer>
    <div class="social-icons">
      <a :href="github" target="_blank"><i class="iconfont icon-github"></i></a>
      <a :href="x" target="_blank"><i class="iconfont icon-tuite"></i></a>
      <a :href="bilibili" target="_blank"><i class="iconfont icon-bilibili"></i></a>
      <a :href="twitch" target="_blank"><i class="iconfont icon-twitch"></i></a>
      <a href="javascript:;">
        <i class="iconfont icon-a-zhongyingwenqiehuanzhong" v-if="!languageStore.isZhCN" @click="changeLanguage()"></i>
        <i class="iconfont icon-a-zhongyingwenqiehuanying" v-else @click="changeLanguage()"></i>
      </a>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 8rem;
  background: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(2px); 
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  height: 60px;
  box-sizing: border-box;
}

.logo {
  margin-right: 10px;
  font-size: 25px;
}

.nav-links {
  display: flex;
  gap: 15px;
  align-items: center;
}

.social-icons {
  display: flex;
  gap: 25px;
}

.social-icons i {
  font-size: 25px;
}

.social-icons a {
  font-size: 1.5em;
}

.nav-links a, .social-icons a {
  text-decoration: none;
  color: #333;
}

/* 媒体查询 */
@media (max-width: 768px) {
  .top-bar {
    padding: 1rem 3rem; /* 调整内边距 */
  }
  .nav-links {
    display: none; /* 隐藏导航链接 */
  }
}


.nav-list-phone {
    .nav {
        display: flex;
        align-items: center;
        height: 40px;
        user-select: none;
        z-index: 2;
        position: relative;
        transition: all .2s linear;
        margin-top: 5px;

        >span {
            padding-left: 7%;
            z-index: 2;
            position: relative;
            cursor: pointer;

            i {
                margin-right: 5px;
            }
        }

        &:not(.active):hover {
            transform: translateY(-5px);
        }

        &::after {
            content: '';
            cursor: pointer;
            width: 90%;
            height: 80%;
            position: absolute;
            left: 0;
            right: 0;
            margin: 0 auto;
            z-index: 1;
            border-radius:2rem;
        }
    }

    .active {
        font-weight: bolder;
    }
}
</style>