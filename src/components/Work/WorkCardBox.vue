<script setup lang="ts">
import { watch } from 'vue'
//监听窗口宽度
import { onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import CreateWorkCardBox from './CreateWorkCardBox.vue'
import { data } from '@/data'
const { workCard:experiences } = data
const { width} = useWindowSize()
const outBoxWidth = ref("auto")
const inBoxWidth = ref("auto")
const boxDirection = ref<'row' | 'column'>('row')
watch(() => width.value, () => {
    if (width.value < 1000) {
        outBoxWidth.value = "auto"
        inBoxWidth.value = "auto"
        boxDirection.value = 'column'
    } else {
        outBoxWidth.value = "auto"
        inBoxWidth.value = "50%"
        boxDirection.value = 'row'
    }
}, { immediate: true })

const workCardBoxRef = ref<HTMLElement>()
onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                workCardBoxRef.value!.classList.add('work-card-box-show')
                // 在这里添加元素进入视口时的逻辑
            } else {
                workCardBoxRef.value!.classList.remove('work-card-box-show')
                // 在这里添加元素离开视口时的逻辑
            }
        })
    });
    intersectionObserver.observe(workCardBoxRef.value!);
})
</script>

<template>
    <div class="work-card-box" ref="workCardBoxRef">
        <CreateWorkCardBox :list="experiences" :outBoxWidth="outBoxWidth" :inBoxWidth="inBoxWidth"
            :boxDirection="boxDirection"></CreateWorkCardBox>
    </div>

</template>


<style scoped>
.work-card-box {
    width: 80%;
    margin: 11rem auto;
    opacity: 0;
    transform: translateY(100px) scale(0.8);
    transition:all 1s ease-in-out ;
}
.work-card-box-show{
    transform: translateY(0) scale(1);
    opacity:1
}
</style>