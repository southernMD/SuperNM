<script setup lang="ts">
import type { NameListOption, NameListSplictOption } from '@/types/Card';
import gsap from 'gsap'
import VanillaTilt from 'vanilla-tilt';
import { computed, type Ref, type VNode } from 'vue';
import { ref, onMounted } from 'vue'
import { render, h } from 'vue'
import { sleep } from '@/utils/sleep';
import { useI18n } from "vue-i18n";
const { tm } = useI18n();
const card = ref();
const des = ref();
const wrap = ref();
const title = ref()
const title2 = ref()
const listItems = ref([]) as Ref<HTMLElement[]>; // 用于存储列表项的引用
const userNameP = ref()
const nameList: NameListOption[] = [
    { name: '南山有壶酒'},
    { name: 'southernMD'},
    { name: "超级牛马人"}
]
const nameListLoad: Array<NameListSplictOption> = []
const maxIndex = computed(() => {
    return nameListLoad.length - 1
})
let index = 0

onMounted(() => {
    nameListLoad.push(...nameList.map((item) => {
        return {
            ...item,
            name: h('p', { class: 'name' }, item.name.split('').map((font) => {
                return h('p', { style: { opacity: 0 } }, font)
            }))
        }
    }))
    console.log(nameListLoad);
    updateName()
})


onMounted(() => {
    VanillaTilt.init(card.value, {
        reverse: true,
        max: 15, // 控制倾斜角度
        speed: 1000, //控制回弹正常的时间
    });
})

const updateName = () => {
    render(nameListLoad[index].name, userNameP.value);
    const children = nameListLoad[index].name.children as VNode[];
    let childIndex = 0;

    const animateChildren = () => {
        children.forEach((child, idx) => {
            const duration = 0.15 + (idx * 0.02);
            const yOffset = 10 + (idx * 5);

            // 第一个动画：从模糊到清晰
            gsap.fromTo(child.el, {
                opacity: 0,
                y: yOffset,
                filter: 'blur(2px)', // 初始模糊效果
            }, {
                duration: duration,
                opacity: 1,
                y: 0,
                filter: 'blur(0)', // 过渡到清晰
                ease: "power1.out",
                onComplete: () => {
                    childIndex++;
                    if (childIndex === children.length) {
                        sleep(2000).then(() => {
                            // 第二个动画：从清晰到模糊
                            gsap.to(nameListLoad[index].name.el, {
                                duration: 0.3,
                                scale: 1.5,
                                opacity: 0,
                                y: -20,
                                filter: 'blur(10px)', // 过渡到模糊
                                onComplete: () => {
                                    index = index >= maxIndex.value ? 0 : index + 1;
                                    render(null, userNameP.value); // 清空当前内容
                                    updateName(); // 递归调用更新名称
                                }
                            });
                        });
                    }
                }
            });
        });
    };

    animateChildren();
};
const move = (event:MouseEvent) => {
    if (des.value && wrap.value && title.value && title2.value) {
        const wrapRect = wrap.value.getBoundingClientRect();
        const offsetX = event.clientX - wrapRect.left;
        const translateX = Math.max(-10, Math.min(10, (offsetX / wrapRect.width) * 20 - 10));
        des.value.style.transform = `translateX(${translateX}px) translateZ(50px)`;
        title.value.style.transform = `translateX(${translateX}px) scale(1.05)`;
        title2.value.style.transform = `translateX(${translateX}px) scale(1.05)`;
    }
}


const resetPosition = () => {
    if (des.value && title.value) {
        des.value.style.transform = 'translateX(0) translateZ(0)';
        title.value.style.transform = `translateX(0px) scale(1)`;
        title2.value.style.transform = `translateX(0px) scale(1)`;
    }
}

const handleMouseEnter = () => {
    listItems.value.forEach(item => {
        item.classList.add('gray-text');
    });
}

const handleMouseLeave = () => {
    listItems.value.forEach(item => {
        item.classList.remove('gray-text');
    });
}

</script>

<template>
    <div class="wrap" @mouseleave="resetPosition(); handleMouseLeave();" @mouseenter="handleMouseEnter" ref="wrap">
        <div class="card-item" ref="card">
            <titile ref="title">MY NAME IS</titile>
            <div class="des" @mousemove="move" ref="des">
                <p ref="userNameP"></p>
            </div>
            <titile ref="title2">I'M a:</titile>
            <ul class="right-aligned-list">
                <li v-for="(item, index) in tm('messageBox.list')" :key="index" ref="listItems">
                    <a :href="item.hash">{{ item.title }}</a>
                </li>
            </ul>
            <div class="n"></div>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    position: absolute;
    z-index: 2;
}
.n{
    height: 100px;
    width: 100px;
    background-image: url("@/assets/n.png");
    background-repeat:no-repeat ;
    background-position: center;
    background-size:100%;
    border-radius: 50%;
    position: absolute;
    bottom: -30px;
    left: -30px;
    border: 1px solid #ccc;
}

.card-item {
    width: 420px;
    height: 450px;
    border-radius: 20px;
    box-shadow: -1px 15px 30px -12px #000;
    transform-style: preserve-3d;
    display: flex;
    align-items: self-start;
    flex-direction: column;
    background-color: rgba(238, 239, 241, .5);
}

.card-item titile {
    margin-top: 1rem;
    margin-left: 2rem;
    font-weight: bolder;
    transition: all 0.2s ease;
}

.des {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    border-bottom: 1px solid black;
    width: 90%;
    box-sizing: border-box;
    transition: all 0.2s ease;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 20px;
}

.des:hover {
    transform: translateZ(50px);
}

.des:hover titile {
    color: #F6901A;
}

.des h6 {
    color: #F6901A;
    font-weight: 400;
}

.des h1 {
    padding: 10px;
    font-size: 26px;
}

.des p {
    color: red;
    display: block;
}

.des p :global(.name) {
    /* display: flex; */
    font-size: 50px;
    text-align: left;
    padding: 0 16px;
    color: #9e9e9e;
    width: 100%;
    font-family: fantasy;
    box-sizing: border-box;
    font-weight: bolder;
    display: inline-block;
    text-align: center;
}

.des p :global(.name p) {
    color: var(--font-color);
    /* flex: 1 1 0; */
    display: inline-block;
}

.right-aligned-list {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: self-end;
    flex-direction: column;
    user-select: none;
}

.right-aligned-list li {
    margin: 0.75rem 0;
    color: black;
    /* 默认文字颜色 */
    font-size: 18px;
    transition: all 0.2s ease;
}

.right-aligned-list .gray-text {
    color: gray;
    /* 鼠标进入时的灰色 */
}

.right-aligned-list li:hover {
    color: black;
    /* 悬停时变为黑色 */
    transform: scale(1.5);
}
</style>
