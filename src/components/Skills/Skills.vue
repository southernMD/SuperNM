<template>
    <div class="skills-box" ref="skillsBoxRef">
        <MaskCard v-for="(programmingLanguage, index) in programmingLanguages" :key="index" :animation="'rotate'"
            :overlayDes="programmingLanguage.sentence"
            :class="['mask-card', { 'last-row-item': isLastRowItem(index) }]">
            <div>
                <h3>{{ programmingLanguage.name }}</h3>
                <div class="progress-bar">
                    <div class="progress" :style="{
                        width: programmingLanguage.randomNumber + '%',
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

const { width } = useWindowSize()
const skillsBoxRef = ref()
const programmingLanguages = [
    {
        name: "Python",
        sentence: "吾乃万法之王，简洁如风，却掌控万物之脉络，数据与算法皆为我所驱使！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "JavaScript",
        sentence: "我是网页的守护者，前端与后端的双生之魂，浏览器皆为我之领域，万物皆可异步！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "Java",
        sentence: "跨平台之霸主，虚拟机为我之铠甲，一次编写，随处运行，众生皆需臣服！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "C++",
        sentence: "我是速度与力量的化身，内存为我之战场，指针如剑，直指核心，无人能敌！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "C#",
        sentence: "微软之刃，Unity之魂，游戏与企业的双生王者，.NET之力为我所用！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "PHP",
        sentence: "我是Web的古老守护者，虽被世人轻视，却依然屹立不倒，服务器为我之领域！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "Ruby",
        sentence: "优雅如诗，简洁如画，Rails为我之翼，开发者皆为我之信徒！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "Go",
        sentence: "我是并发之王者，轻量如羽，却迅捷如雷，云原生世界为我所掌控！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "Swift",
        sentence: "苹果之刃，iOS与macOS的守护者，简洁与安全并存，未来由我书写！",
        randomNumber: Math.floor(Math.random() * 101)
    },
    {
        name: "Kotlin",
        sentence: "我是Java的继承者，Android的新王，简洁与强大并存，旧时代的终结者！",
        randomNumber: Math.floor(Math.random() * 101)
    }
];

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
    } else {
        skillsBoxRef.value!.classList.add('skills-box-grid-less')
        skillsBoxRef.value!.classList.remove('skills-box-grid-more')
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
    height: 100vh;
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