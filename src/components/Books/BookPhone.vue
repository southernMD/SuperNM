<!-- src/components/Books/BookPhone.vue -->
<template>
    <div class="book-phone">
        <img :src="image" :alt="title" class="book-image">
        <div class="book-info">
            <h3>{{ title }}</h3>
            <p>{{ author }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    image: string;
    title: string;
    author: string;
}>();
</script>

<style scoped>
.book-phone {
    width: 100%;
    padding: 32px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background 0.3s ease, box-shadow 0.3s ease;
    box-sizing: border-box;
    gap: 32px;
}

.book-phone:hover{
    background-color: #1a2234;
}
.book-phone:hover .book-info h3{
    color: white;
}

.book-image {
    width: 55px;
    height: 70px;
    object-fit: cover;
    border-radius: 5px;
}
.book-info{
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: start;
}
.book-info h3 {
    font-size:1.125rem;
    margin: 0;
    line-height: 2em;
}

.book-info p {
    font-size:1rem;
    color: var(--font-color);
    text-align: start;
    line-height: 1.5rem;
}
</style>