<script setup lang="ts">
import type { WorkCard } from '@/types/Work';

defineProps<{list?:WorkCard[]} & {boxDirection:'row' | 'column',outBoxWidth:string,inBoxWidth:string}>()

</script>

<template>
    <WorkCard v-for="item in list" 
        v-bind="item"
        :direction="boxDirection" :width="outBoxWidth" height="auto" :ishasSlot="item.children?.length ?? 0  !== 0">
        <template #name>
            <i v-dompurify-html="item.icon"></i>
        </template>
        <CreateWorkCardBox 
        :list="item.children" 
        :outBoxWidth="inBoxWidth" 
        :inBoxWidth="inBoxWidth" 
        :boxDirection="boxDirection">
        </CreateWorkCardBox>
    </WorkCard>
</template>


<style scoped>

</style>