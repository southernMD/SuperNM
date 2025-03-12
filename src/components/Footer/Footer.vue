<script setup lang="ts">
import { } from 'vue'
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import { data } from '@/data'
const { github,x,bilibili,twitch } = data.topBarLink

</script>

<template>
    <div class="footer">
        <footer>
            {{ t("bothName") }}
            <div class="social-icons">
                <a :href="github"><i class="iconfont icon-github"></i></a>
                <a :href="x"><i class="iconfont icon-tuite"></i></a>
                <a :href="bilibili"><i class="iconfont icon-bilibili"></i></a>
                <a :href="twitch"><i class="iconfont icon-twitch"></i></a>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.footer {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    color: #bec1c7;
    font-size: 1.25em;
    line-height: 2em;
    margin-bottom: 11rem;
}
.social-icons {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: center;
}

.social-icons i {
  font-size: 25px;
}

.social-icons a {
  font-size: 1.5em;
}
</style>