import { createApp } from 'vue'
import './base.css'
import './style.css'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueDOMPurifyHTML from 'vue-dompurify-html';
import App from './App.vue'
import zh from './i18n/zh.json'
import en from './i18n/en.json'
const i18n = createI18n({
    legacy: false,
    useScope: 'global',
    locale: 'zh',
    messages: {zh,en}
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(i18n).use(pinia).use(VueDOMPurifyHTML).mount('#app')
