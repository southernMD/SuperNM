<script setup lang="ts">
import { onMounted, ref, type Ref } from "vue";
import { useI18n } from "vue-i18n";
import { useWindowSize } from '@vueuse/core'
import type { Book } from "@/types/Book";
const { width } = useWindowSize()
const { t } = useI18n();
import { data } from "@/data"
const books: Ref<Book[]> = ref(data.book);

const BoxRef = ref()
onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                BoxRef.value!.classList.add('box-show')
            } else {
                BoxRef.value!.classList.remove('box-show')
            }
        })
    });
    intersectionObserver.observe(BoxRef.value!);
});
</script>

<template>
    <div class="container" ref="BoxRef">
        <!-- 标题 -->
        <div class="reading-list">
            <h2>{{ t('books.title') }}</h2>
            <p v-dompurify-html="t('books.description')"></p>
        </div>

        <!-- 书籍展示 -->
        <div class="book-list" v-if="width > 1000">
            <Book v-for="book in books" :image="book.image" :title="book.title" :author="book.author" :link="book.link"
                :width="book.width" :height="book.height" :size="book.size" :position="book.position"></Book>
        </div>
        <div class="book-phone-list" v-else>
            <BookPhone v-for="book in books" :image="book.image" :title="book.title" :author="book.author"
                :link="book.link"></BookPhone>
        </div>
    </div>
</template>

<style scoped>
/* 基础布局 */
.container {
    width: 80%;
    margin: 11rem auto;
    padding: 20px;
    text-align: center;
    opacity: 0;
    transform: translateY(100px) scale(0.8);
    transition: all 1s ease-in-out;
}

.box-show {
    transform: translateY(0) scale(1);
    opacity: 1;
}

/* 标题区域 */
.reading-list {
    background: #1f2d3d;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 30px;
    width: 50%;
    text-align: start;
    line-height: 1.25;
}

.reading-list h2 {
    font-size: 1.8em;
    line-height: 2em;
    font-weight: bolder;
    color: orange;
}

/* 书籍列表 */
.book-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 36px;
    justify-content: center;
    margin-top: 20px;
}

@media screen and (max-width: 1280px) {
    .book-list {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* 书籍卡片 */
.book-card {
    background: white;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.book-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
}

.book-card img {
    width: 100%;
    border-radius: 5px;
}

.book-phone-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
</style>
