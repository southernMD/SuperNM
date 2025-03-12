<script setup lang="ts">
import type { CardRotateElement, CardRotateElementStringValue } from '@/types/Card';
import { onMounted, ref, type Ref } from 'vue';
import { data } from '@/data';
const { labels } = data.card

const labelsLoad: Array<CardRotateElement> = []
const drawCircles = (canvas: HTMLCanvasElement, rotationAngle: number) => {
  const ctx = canvas.getContext('2d')!;

  // 设置虚线样式
  ctx.setLineDash([5, 5]); // 虚线的样式

  // 计算大圆和小圆的半径
  const bigCircleRadius = Math.max((canvas.width * 0.3), 200); // 大圆半径为画布宽度的 20%
  const smallCircleRadius = bigCircleRadius * 0.7; // 小圆半径为大圆的 70%

  // 计算圆心的 y 坐标，靠近 x 轴
  const centerY = canvas.height / 2; // 圆心在画布中间
  const centerX = canvas.width / 2; // 圆心在画布中间

  // 绘制大圆
  ctx.beginPath();
  ctx.arc(centerX, centerY, bigCircleRadius, rotationAngle + Math.PI / 6, rotationAngle - Math.PI / 6, true); // 完整大圆
  ctx.strokeStyle = '#A9A9A9'; // 深灰色
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(centerX, centerY, smallCircleRadius, rotationAngle + Math.PI / 6, rotationAngle - Math.PI / 6, true); // 完整小圆
  ctx.strokeStyle = '#D3D3D3'; // 浅灰色
  ctx.stroke();

  // 绘制小圆（嵌套）
  ctx.beginPath();
  ctx.arc(centerX, centerY, smallCircleRadius, rotationAngle + Math.PI / 6 * 5, rotationAngle - Math.PI / 6 * 5); // 完整小圆
  ctx.strokeStyle = '#D3D3D3'; // 浅灰色
  ctx.stroke();

  // 绘制小圆（嵌套）
  ctx.beginPath();
  ctx.arc(centerX, centerY, bigCircleRadius, rotationAngle + Math.PI / 6 * 5, rotationAngle - Math.PI / 6 * 5); // 完整小圆
  ctx.strokeStyle = '#A9A9A9'; // 浅灰色
  ctx.stroke();

  // 返回圆心坐标和半径
  return { centerX, centerY, bigCircleRadius, smallCircleRadius };
};

const canvas = ref<HTMLCanvasElement | null>(null);
const radii: number[] = []; // 存储每个 label 的半径
const angularSpeeds: number[] = []; // 存储每个 label 的角速度
const currentAngles: number[] = []; // 存储每个 label 的当前角度

let lastBigCircleRadius = 0
let currentRotationAngle = 0;

const draw = () => {
  if (canvas.value) {
    canvas.value.width = canvas.value.clientWidth; // 设置画布宽度
    canvas.value.height = canvas.value.clientHeight; // 设置画布高度
    const { centerX, centerY, bigCircleRadius, smallCircleRadius } = drawCircles(canvas.value, currentRotationAngle); // Pass the rotation angle

    // 为每个 label 创建对应的 radius 和角速度
    labelsLoad.forEach((_, index) => {
      if (radii[index] !== undefined) {
        // console.log(lastBigCircleRadius - bigCircleRadius);
        radii[index] = radii[index] - lastBigCircleRadius + bigCircleRadius;
      } else {
        const radius = Math.random() * (bigCircleRadius - smallCircleRadius) + smallCircleRadius; // 随机生成半径
        const angularSpeed = 0.01 + Math.random() * 0.005; // 随机生成角速度
        radii[index] = radius; // 存储半径
        angularSpeeds[index] = angularSpeed; // 存储角速度
        currentAngles[index] = 0; // 初始化当前角度
      }
    });
    lastBigCircleRadius = bigCircleRadius
    animate(centerX, centerY); // 开始动画
  }
};

// 判断内容类型并绘制
const drawLabel = (ctx: CanvasRenderingContext2D, label: CardRotateElement, x: number, y: number) => {
  if (label.value instanceof HTMLImageElement) {
    ctx.save();
    ctx.scale(label.scale!, label.scale!);
    const newX = (x - label.value.width / 2) / label.scale!;
    const newY = (y - label.value.height / 2) / label.scale!;
    ctx.drawImage(label.value as HTMLImageElement, newX, newY, label.value.width, label.value.height);
    ctx.restore();
  } else {
    const fontSize = 25 * (label.scale ?? 1);
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // 文本颜色
    ctx.fillText(label.value as string, x, y); // 绘制文本
  }
};
let requestAnimationFrameId: number
// 修改 animate 函数以绘制所有 labels
const animate = (centerX: number, centerY: number) => {
  const ctx = canvas.value!.getContext('2d')!; // 获取 canvas 上下文

  const drawLabels = () => {
    ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height); // 清空 canvas
    drawCircles(canvas.value!, currentRotationAngle); // Pass the current rotation angle

    labelsLoad.forEach((label, index) => {
      const radius = radii[index]; // 获取对应的半径
      const angularSpeed = angularSpeeds[index]; // 获取对应的角速度
      const angle = (index * Math.PI * 2) / labelsLoad.length + currentAngles[index]; // 当前角度

      // 计算文本位置
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // 绘制标签
      drawLabel(ctx, label, x, y);

      // 更新当前角度
      currentAngles[index] += angularSpeed; // 增加角度
    });

    // Increment the rotation angle for the next frame
    currentRotationAngle -= 0.01; // Adjust this value to control the speed of rotation

    cancelAnimationFrame(requestAnimationFrameId);
    requestAnimationFrameId = requestAnimationFrame(drawLabels); // 使用 requestAnimationFrame
  };

  drawLabels(); // 开始绘制
};
const init = async () => {
  const loadImages = labels.map(label => {
    return new Promise<CardRotateElement>((resolve) => {
      const img = new Image();
      img.src = label.value as string;
      const timeoutId = setTimeout(() => {
        console.log('图片加载超时', label);
        resolve(label);
      }, 5000);

      img.onload = () => {
        clearTimeout(timeoutId);
        resolve({ value: img, scale: label.scale ?? 1 });
      };
      img.onerror = () => {
        clearTimeout(timeoutId);
        console.log('图片加载失败', label);
        resolve(label); // 图片加载失败，直接完成
      };
    });
  });
  labelsLoad.push(...await Promise.all(loadImages));
}
onMounted(async () => {
  await init()
  draw();
});
const cardRef = ref<HTMLDivElement>()
onMounted(() => {
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio <= 0) return;
    cardRef.value!.style.transform = 'translateY(0)'
    intersectionObserver.disconnect()
  });
  // 开始监听
  intersectionObserver.observe(cardRef.value!);
})

window.addEventListener('resize', draw);

</script>

<template>
  <div class="card" ref="cardRef">
    <canvas class="canvas" ref="canvas"></canvas>
    <MessageBox></MessageBox>
  </div>
</template>

<style scoped>
.card {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  transition: transform 1s ease-out;
  transform: translateY(50px);
}

.canvas {
  width: 80%;
  height: 100%;
  background-color: transparent;
  /* 确保背景透明 */
}

.rotating-div {
  position: absolute;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid #333;
  border-radius: 50%;
}
</style>