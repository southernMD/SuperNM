<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<template>
  <div class="footer-message" >{{ t("footerMessage.msg") }}</div>
</template>

<style scoped>
.footer-message{
    width: 80%;
    margin: 0 auto 11rem auto;
    font-size: 2.5em;
}
</style>