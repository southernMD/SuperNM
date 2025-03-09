<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import type { normalText, WorkCard } from '@/types/Work';
defineProps<WorkCard & {direction:'row' | 'column',width:string,height:string,ishasSlot:boolean}>()
const { width:winWidth} = useWindowSize()
</script>

<template>
    <div class="work-card" :style="{
        width: width ?? '300px',
        height: height ?? '400px',
        background: background ?? 'rgb(255, 255, 255)',
        flexDirection: direction,
        
    }"
    :class="{
        'work-card-Fcolumn-slot-gap':FDirection === 'column'&& winWidth >= 1000 && ishasSlot
    }"
    >
        <div class="card-container" :style="{
            flexDirection: (FDirection ?? direction)
        }"
        :class="{ 
            'card-container-row': (FDirection ?? direction) === 'row' && !ishasSlot,
            'card-container-column': (FDirection ?? direction) === 'column' && !ishasSlot,
            'card-container-row-slot':  (FDirection ?? direction) === 'row' && ishasSlot,
            'card-container-column-slot': (FDirection ?? direction) === 'column' && ishasSlot,
            'card-container-Fcolumn-slot': FDirection === 'column'&& winWidth >= 1000 && ishasSlot,
            'card-container-Frow-slot':FDirection === 'row' && winWidth < 1000 && ishasSlot,
        }"
        >
            <div class="header" :style="{ order: descriptionOrder }"
                :class="{ 'header-row': (FDirection ?? direction) === 'row', 'header-column': (FDirection ?? direction) === 'column' }"
                >
                <header>
                    <slot name="name"></slot>
                    <h2>{{ title }}</h2>
                </header>
                <p :style="{color: descriptionColor}">{{ description }}</p>
            </div>
            <div class="links" :class="{ 'links-row': (FDirection ?? direction) === 'row', 'links-column': (FDirection ?? direction) === 'column' }">
                <MaskCard :animation="'rotate'" :overlayDes="maskCarditem.overlayDes" v-for="maskCarditem in maskCard">
                    <div class="txt">
                        <div class="title">
                            {{ (maskCarditem.msg as normalText ).title }}
                        </div>
                        <div class="des">
                            {{ (maskCarditem.msg as normalText ).description }}
                        </div>
                    </div>
                </MaskCard>
            </div>
        </div>
        <slot></slot>
    </div>

</template>

<style scoped>
:slotted(i *) {
    color: var(--font-color);
    font-size: 2rem;
}
:slotted(.work-card){
    box-sizing: border-box;
}

.slot-footer-row{
    width: 50%;
}
.slot-footer-column{
    width: 100%;
}
.work-card {
    padding: 20px;
    display: flex;
    grid-template-rows: 1fr;
    gap: 10px;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    min-height: 300px;
}

.work-card-Fcolumn-slot-gap{
    gap: 40px;
}

.card-container {
    display: flex;
    flex-direction: row;
    color: white;
    gap: 1rem;
}

.header {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.card-container-row {
    width: 100%;
    max-height: 100%;
}

.card-container-column {
    height: 50%;
    max-height: 50%;
    width: 100%;
}
.card-container-row-slot{
    width: 50%;
    max-height: 100%;
}
.card-container-column-slot {
    height: 50%;
    max-height: 50%;
    width: 100%;
}
.card-container-Fcolumn-slot{
    max-width: 40%;
}
.card-container-Frow-slot{
    width: 100%;
}
.header-row {
    width: 50%;
    height: 100%;
    max-height: 100%;
}

.header-column {
    height: 50%;
    max-height: 50%;
    width: 100%;
}


.header header {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--font-color);
    margin-bottom: .5rem;
}

.header h2 {
    font-size: 30px;
    font-weight: bold;
    margin: 0;
    word-break: break-word;
    width: calc(100% - 2rem - 10px);
}

.header p {
    font-size: 14px;
    opacity: 0.8;
    display: block;
    width: 100%;
    word-break: break-word;
    overflow: hidden;
    max-height: inherit;
    line-height: 1.25rem;
}

.links {
    order: 0;
    display: grid;
    /* 使用 Grid 布局 */
    grid-template-columns: 1fr;
    /* 每行一个 */
    gap: 10px;
    /* 子盒子之间的间距 */
    height: 100%;
    /* 使其占满父容器的高度 */
}

.links-row {
    width: 50%;
}

.links-column {
    width: 100%;
}
</style>