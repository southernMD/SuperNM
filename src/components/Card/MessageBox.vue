<script setup>
import VanillaTilt from 'vanilla-tilt';
import { ref, onMounted } from 'vue'

const card = ref();
const des = ref();
const wrap = ref();
const title = ref()
const title2 = ref()
const listItems = ref([]); // 用于存储列表项的引用
onMounted(() => {
    VanillaTilt.init(card.value, {
        reverse: true,
        max: 15, // 控制倾斜角度
        speed: 1000, //控制回弹正常的时间
    });
})

const move = (event) => {
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
    console.log(">>>>");
    
    listItems.value.forEach(item => {
        item.classList.remove('gray-text');
    });
}

</script>

<template>
    <div class="wrap" @mouseleave="resetPosition();handleMouseLeave();"  @mouseenter="handleMouseEnter"  ref="wrap">
        <div class="card-item" ref="card">
            <titile ref="title">MY NAME IS</titile>
            <div class="des" @mousemove="move" ref="des">
                <p>
                    Slow, steady and powerful, Giants are massive warriors that soak up
                    huge amounts of damage. Show them a turret or cannon and you'll see
                    their fury unleashed!
                </p>
            </div>
            <titile ref="title2">I'M:a</titile>
            <ul class="right-aligned-list">
                <li ref="listItems" v-for="(item, index) in 3" :key="index"><a href="#">项目 {{ index + 1 }}</a></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.wrap {
    position: absolute;
    z-index: 2;
}

.card-item {
    width: 350px;
    height: 500px;
    border-radius: 20px;
    box-shadow: -1px 15px 30px -12px #000;
    transform-style: preserve-3d;
    display: flex;
    align-items: self-start;
    flex-direction: column;
    background-color: rgba(238, 239, 241,.5);
}

.card-item titile {
    margin-top: 1rem;
    margin-left: 2rem;
    font-weight: bolder;
    transition: all 0.2s ease;
}

.role img {
    width: 390px;
    position: absolute;
    top: -30%;
    left: -18%;
    transform: translateZ(50px);
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
    text-align: left;
    font-size: 14px;
    padding: 0 16px;
    color: #9e9e9e;
}

.right-aligned-list{
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: self-end;
    flex-direction: column;
    user-select: none;
}
.right-aligned-list li{
    margin: 1rem 0;
}

.right-aligned-list li {
    margin: 1rem 0;
    color: black; /* 默认文字颜色 */
}

.right-aligned-list .gray-text {
    color: gray; /* 鼠标进入时的灰色 */
}

.right-aligned-list li:hover {
    color: black; /* 悬停时变为黑色 */
}
</style>
