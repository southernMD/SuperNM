<template>
    <div class="skills-box" ref="skillsBoxRef">
        <MaskCard v-for="(programmingLanguage, index) in programmingLanguages" :key="index" :animation="'rotate'"
            :overlayDes="programmingLanguage.sentence"
            :class="['mask-card', { 'last-row-item': isLastRowItem(index) }]">
            <div>
                <h3>{{ programmingLanguage.name }}</h3>
                <div class="progress-bar">
                    <div class="progress" :style="{
                        width: programmingLanguage.percentage + '%',
                        backgroundColor: progressColors[index]
                    }">
                    </div>
                </div>
            </div>
        </MaskCard>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { watch } from 'vue'
import { data } from '@/data'
const { programmingLanguages } = data
const { width } = useWindowSize()
const skillsBoxRef = ref()

// 生成随机颜色
const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

// 为每个进度条生成一个随机颜色
const progressColors = ref<string[]>([]);
progressColors.value = programmingLanguages.map(() => generateRandomColor());

// 定期更新进度条颜色
const updateProgressColors = () => {
    progressColors.value = programmingLanguages.map(() => generateRandomColor());
};

// 启动颜色更新定时器
onMounted(() => {
    setInterval(updateProgressColors, 500); 
});

// 计算当前列数
const columnCount = computed(() => {
    return width.value > 1000 ? 4 : 2;
});

// 判断是否是最后一行剩余的卡片
const isLastRowItem = (index: number) => {
    const total = programmingLanguages.length;
    const remainder = total % columnCount.value;
    if (remainder === 0) return false; // 刚好整除，没有剩余
    return index >= total - remainder;
};

// 设置布局
const setSkillsBoxGrid = () => {
    if (width.value > 1000) {
        skillsBoxRef.value!.classList.add('skills-box-grid-more')
        skillsBoxRef.value!.classList.remove('skills-box-grid-less')
        skillsBoxRef.value!.classList.remove('skills-box-grid-less-less')
    } else if(width.value > 500) {
        skillsBoxRef.value!.classList.add('skills-box-grid-less')
        skillsBoxRef.value!.classList.remove('skills-box-grid-more')
        skillsBoxRef.value!.classList.remove('skills-box-grid-less-less')
    }else{
        skillsBoxRef.value!.classList.add('skills-box-grid-less-less')
        skillsBoxRef.value!.classList.remove('skills-box-grid-more')
        skillsBoxRef.value!.classList.remove('skills-box-grid-less')

    }
};

// 监听宽度变化
watch(() => width.value, () => {
    setSkillsBoxGrid()
});

// 初始化
onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsBoxRef.value!.classList.add('skills-box-show')
                setSkillsBoxGrid()
            } else {
                skillsBoxRef.value!.classList.remove('skills-box-show')
            }
        })
    });
    intersectionObserver.observe(skillsBoxRef.value!);
});
</script>

<style scoped>
.skills-box {
    width: 80%;
    margin: 11rem auto;
    opacity: 0;
    transform: translateY(100px) scale(0.8);
    transition: all 1s ease-in-out;
    height: auto;
}

.skills-box-show {
    transform: translateY(0) scale(1);
    opacity: 1;
}

.skills-box-grid-more {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.skills-box-grid-less {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.skills-box-grid-less-less{
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
}

.last-row-item {
    grid-column: 1 / -1;
}

.progress-bar {
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
    height: 20px;
    margin-top: 5px;
}

.progress {
    height: 100%;
    transition: width 0.5s ease, background-color 0.5s ease;
    animation: glow 1.5s infinite;
    /* 闪闪发光的效果 */
}

/* 闪闪发光的效果 */
@keyframes glow {
    0% {
        opacity: 0.8;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
    }

    50% {
        opacity: 1;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.9);
    }

    100% {
        opacity: 0.8;
        box-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
    }
}
</style>