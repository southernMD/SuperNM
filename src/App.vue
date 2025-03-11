<script setup lang="ts">
import topBar from "@/components/topBar.vue"
import Card from "@/components/Card/Card.vue"
import { onMounted } from "vue";
import { useLanguageStore } from '@/store/index';
import { useI18n } from "vue-i18n";
import WorkCardBox from "./components/Work/WorkCardBox.vue";
import Skills from "./components/Skills/Skills.vue";
const { locale } = useI18n();
const languageStore = useLanguageStore();

onMounted(() => {
  if (languageStore.isZhCN) {
    locale.value = 'zh'
  } else {
    locale.value = 'en'
  }
})
</script>

<template>
  <div style="height:100vh; width: 100vw;">
    <el-scrollbar style="height:100%">
      <topBar></topBar>
      <Card></Card>
      <CarouselList></CarouselList>
      <WorkCardBox></WorkCardBox>
      <Skills></Skills>
      <Game></Game>
      <Video></Video>
      <ChartBox></ChartBox>
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel, laudantium inventore ab sit quia aut. Non,
        accusamus cupiditate ex voluptas tempore nemo illum porro, aliquam reprehenderit, fugit suscipit. Dolores, ipsa.
      </div>
    </el-scrollbar>
  </div>
</template>

<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}

.el-drawer__header {
  margin-bottom: 10px;
}
body{
  background: #f5f5f5;
}
</style>
