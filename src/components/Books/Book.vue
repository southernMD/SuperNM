<script setup lang="ts">
import type { Book } from '@/types/Book';

withDefaults(defineProps<Book>(), {
    position: 'left',
    size: 20,
    width: 150,
    height: 200,
    link: "#"
})
</script>

<template>
    <a class="video-card" rel="noopener noreferrer" target="_blank" :href="link" :class="{
        'video-card-left': position === 'left',
        'video-card-right': position === 'right'
    }" :style="{
        '--book-size': size,
        '--book-width': width,
        '--book-height': height
    }">
        <div class="book-info">
            <h3>{{ title }}</h3>
            <p>{{ author }}</p>
        </div>
        <div class="book-container">
            <div class="book">
                <div class="book-3d">
                    <div class="book-front">
                        <img :src="image" :alt="title">
                    </div>
                    <div class="book-side"></div>
                    <div class="book-bottom"
                        :class="{ 'book-bottom-tr-right': position === 'right', 'book-bottom-tr-left': position === 'left' }">
                    </div>
                </div>
            </div>
        </div>
        <span class="view-link"><span>View on Literal</span> <span class="arrow">↗</span></span>
    </a>
</template>

<style scoped>
.video-card {
    min-height: 300px;
    border-radius: 16px;
    overflow: hidden;
    background: white;
    transition: transform 0.5s ease,background 0.5s ease;
    justify-content: center;
    padding: 2em;
    display: flex;
    flex-direction: column;
    position: relative;

}
.video-card:hover{
    background-color:#1a2234 ;
}

.book-info {
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    font-weight: bold;
    position: absolute;
    top: 2em;
    transition: opacity 0.5s ease, transform 0.5s ease;
    opacity: 0;
    transform: translateY(-10px);
}

.book-info h3 {
    font-size: 1.125rem;
    margin: 0;
    line-height: 2em;
    text-align: start;
    color: white;
}

.book-info p {
    font-size: 1rem;
    color: var(--font-color);
    text-align: start;
    line-height: 1.5rem;
}

.video-card:hover .book-info{
    opacity: 1;
    transform: translateY(0);
}

.book-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
}

.book {
    position: relative;
    width: calc(var(--book-width) * 1px);
    height: calc(var(--book-height) * 1px);
    transform-style: preserve-3d;
}

.book-3d {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotateX(0) rotateY(0) rotateZ(0);
    transform-style: preserve-3d;
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.video-card-left:hover .book-3d {
    transform: rotateX(70deg) rotateZ(45deg) scale(.7) translateZ(-20px);
}

.video-card-right:hover .book-3d {
    transform: rotateX(70deg) rotateZ(-45deg) scale(.7) translateZ(-20px);
}

.book-front {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translateZ(20px);
    background: white;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.book-front img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.book-side {
    position: absolute;
    width: 100%;
    height: calc(var(--book-size) * 1px);
    transform: rotateX(-90deg) translateZ(calc(var(--book-height) * 1px)) translateY(-20px);
    transform-origin: top;
    background: #f0f0f0;
}

.book-bottom {
    position: absolute;
    width: calc(var(--book-size) * 1px);
    height: 100%;
    background: #e0e0e0;
    transform-origin: left;
}

.book-bottom-tr-right {
    transform: rotateY(90deg) translateX(-20px);
}

.book-bottom-tr-left {
    transform: rotateY(90deg) translateX(-20px) translateZ(calc(var(--book-width) * 1px));
}

.book-title {
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.book-author {
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.view-link {
    margin-top: 20px;
    color: white;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.5s ease, transform 0.5s ease;
    display: flex;
    align-items: center;
    gap: 4px;
    transform: translateY(10px);
}

.view-link span:first-child {
    text-decoration: underline dotted;
}


.video-card:hover .view-link {
    opacity: 0.8;
    transform: translateY(0);
}

.view-link:hover {
    opacity: 1;
}

.arrow {
    font-size: 12px;
}
</style>