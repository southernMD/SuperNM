import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLanguageStore = defineStore('language', () => {
  const isZhCN = ref(true); // 默认语言状态

  function toggleLanguage() {
    isZhCN.value = !isZhCN.value; // 切换语言状态
  }

  return { isZhCN, toggleLanguage };
},{
  persist:{
    pick: ['isZhCN']
  }
});