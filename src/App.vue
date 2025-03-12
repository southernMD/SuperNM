<script setup lang="ts">
import topBar from "@/components/topBar.vue"
import Card from "@/components/Card/Card.vue"
import { onMounted } from "vue";
import { useLanguageStore } from '@/store/index';
import { useI18n } from "vue-i18n";
import WorkCardBox from "./components/Work/WorkCardBox.vue";
import Skills from "./components/Skills/Skills.vue";
const { locale,tm } = useI18n();
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
      <Card ></Card>
      <CarouselList :id="tm('topNav')[0].hash.replace('#','')"></CarouselList>
      <WorkCardBox></WorkCardBox>
      <Skills :id="tm('topNav')[1].hash.replace('#','')"></Skills>
      <Game :id="tm('topNav')[2].hash.replace('#','')"></Game>
      <Video :id="tm('topNav')[3].hash.replace('#','')"></Video>
      <ChartBox :id="tm('topNav')[4].hash.replace('#','')"></ChartBox>
      <BookBox :id="tm('topNav')[5].hash.replace('#','')"></BookBox>
      <FooterMessage></FooterMessage>
      <Footer></Footer>
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
