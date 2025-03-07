import { createApp } from 'vue'
import './base.css'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import zh from './i18n/zh.json'
import en from './i18n/en.json'
const i18n = createI18n({
    locale: 'zh',
    messages: {zh,en}
})
createApp(App).use(i18n).mount('#app')
