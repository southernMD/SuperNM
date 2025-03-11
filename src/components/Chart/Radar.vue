<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import * as d3 from 'd3';

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            { axis: 'Drama', value: 11 },
            { axis: 'Comedy', value: 11 },
            { axis: 'Animation', value: 11 },
            { axis: 'Fantasy', value: 11 },
            { axis: 'Action', value: 11 },
            { axis: 'Action', value: 11 },
            { axis: 'Science Fiction', value: 15 },
            { axis: 'Romance', value:22},
        ]
    },
    width: {
        type: Number,
        default: 450
    },
    height: {
        type: Number,
        default: 450
    }
});
const svgWidth = ref(props.width)
const svgHeight = ref(props.height)
const key = Math.floor(Math.random() * 100000)
watch(()=>props.width, () => {
    svgWidth.value = props.width
    svgHeight.value = props.height
    draw()
})
const chartRef = ref<SVGSVGElement | null>(null);

const draw = () => {
    if (!chartRef.value) return;
    console.log(key);
    
    const margin = { top: 60, right: 60, bottom: 50, left: 50 };
    const innerWidth = svgWidth.value - margin.left - margin.right;
    const innerHeight = svgHeight.value - margin.top - margin.bottom;

    const centerX = svgWidth.value / 2;
    const centerY = svgHeight.value / 2;

    d3.select(chartRef.value).selectAll("*").remove(); // 清空旧图表

    const svg = d3.select(chartRef.value)
        .attr("width", svgWidth.value)
        .attr("height", svgHeight.value)
        .append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`);

    const max = d3.max(props.data, d => d.value) || 1;
    const radius = Math.min(innerWidth, innerHeight) / 2;

    const angleScale = d3.scaleLinear()
        .domain([0, props.data.length])
        .range([0, 2 * Math.PI]);

    const radiusScale = d3.scaleLinear()
        .domain([0, max])
        .range([0, radius]);

    const line = d3.lineRadial()
        .angle((d, i) => angleScale(i))
        .radius(d => radiusScale(d))
        .curve(d3.curveLinearClosed);

    // 画背景网格
    const levels = 5;
    const levelFactor = radius / levels;

    for (let level = 1; level <= levels; level++) {
        const r = levelFactor * level;
        svg.append("circle")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", r)
            .attr("fill", "none")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1);
    }

    const tooltip = d3.select(`.tooltip-${key}`)
    console.log(tooltip);

    svg.append("circle") // 创建鼠标感应区
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radius)
        .attr("fill", "transparent")
        .style("pointer-events", "all");

    let activeAxis:null | number = null; // 记录当前高亮的轴

    // 监听鼠标移动
    svg.on("mousemove", function (event) {
        const [mouseX, mouseY] = d3.pointer(event); // 获取鼠标相对SVG的位置
        let minDist = Infinity;
        let closestAxis = null;

        // 遍历所有轴，找最近的
        props.data.forEach((d, i) => {
            const angle = angleScale(i);
            const x = radius * Math.cos(angle - Math.PI / 2);
            const y = radius * Math.sin(angle - Math.PI / 2);

            const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2); // 计算距离
            if (dist < minDist) {
                minDist = dist;
                closestAxis = i;
            }
        });

        // 取消上一个高亮的轴
        if (activeAxis !== null && activeAxis !== closestAxis) {
            d3.select(`#axis-${activeAxis}-${key}`)
                .attr("stroke", "#ccc")
                .attr("stroke-dasharray", "none");
        }
        
        // 设置新的高亮轴
        activeAxis = closestAxis;
        d3.select(`#axis-${activeAxis}-${key}`)
            .attr("stroke", "#666")
            .attr("stroke-dasharray", "4,4");

        // 获取当前高亮轴的数据
        const d = props.data[activeAxis!];
        // const angle = angleScale(activeAxis! - 1);
        // const x = radius * Math.cos(angle - Math.PI / 2);
        // const y = radius * Math.sin(angle - Math.PI / 2);

        // 显示 Tooltip
        tooltip.style("opacity", 1)
            .style("left", `${event.offsetX}px`)
            .style("top", `${event.offsetY}px`)
            .select("strong").html(d.axis)
        tooltip.select("span").html(`count ${d.value}`)

    });

    // 鼠标离开雷达图，恢复所有轴，并隐藏 Tooltip
    svg.on("mouseleave", function () {
        d3.selectAll(".radar-axis")
            .attr("stroke", "#ccc")
            .attr("stroke-dasharray", "none");
        activeAxis = null;

        tooltip.style("opacity", 0); // 隐藏 tooltip
    });
    // 画坐标轴，并赋予唯一ID
    props.data.forEach((d, i) => {
        const angle = angleScale(i);
        const x = radius * Math.cos(angle - Math.PI / 2);
        const y = radius * Math.sin(angle - Math.PI / 2);

        svg.append("line")
            .attr("id", `axis-${i}-${key}`) // 赋予唯一ID
            .attr("class", "radar-axis")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", x)
            .attr("y2", y)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1);

        svg.append("text")
            .attr("x", x * 1.1)
            .attr("y", y * 1.1)
            .attr("text-anchor", angle > Math.PI ? "end" : "start")
            .attr("alignment-baseline", "middle")
            .style("font-size", "12px")
            .text(d.axis);
    });




    // 画雷达区域
    svg.append("path")
        .datum(props.data.map(d => d.value))
        .attr("d", line)
        .attr("fill", "#66CCFF")
        .attr("fill-opacity", 0.6)
        .attr("stroke", "#66CCFF")
        .attr("stroke-width", 2);

    // 画数据点
    props.data.forEach((d, i) => {
        const angle = angleScale(i); // 不减1，确保匹配雷达图的角度
        const rotatedAngle = angle - Math.PI / 2; // 旋转 90° 以匹配视觉方向
        const x = radiusScale(d.value) * Math.cos(rotatedAngle);
        const y = radiusScale(d.value) * Math.sin(rotatedAngle);

        svg.append("circle")
            .attr("cx", x)
            .attr("cy", y)
            .attr("r", 6)
            .attr("fill", "#66ccff")
    });

};

onMounted(() => {
    draw();
});

watch(() => props.data, draw, { deep: true });
</script>

<template>
    <div style="position: relative;">   
        <div class="tooltip" :class="`tooltip-${key}`">
            <strong></strong>
            <span></span>
        </div>
        <svg ref="chartRef" :viewBox="`0 0 ${svgWidth} ${svgHeight}`"></svg>
    </div>

</template>

<style scoped>
svg {
    border-radius: .5rem;
}
.tooltip{
    position: absolute;
    z-index: 999;
    background: #fff;
    border:1px solid #ccc;
    border-radius:8px;
    padding:10px;
    font-size:14px;
    line-height:1.4;
    box-shadow:0px 4px 8px rgba(0,0,0,0.15);
    pointer-events:none;
    top: 100px;
    bottom: 100px;
    display: flex;
    flex-direction: column;
    height: 60px;
    min-width: 100px;
    opacity: 0;
    strong{
        font-size: 1.5em;
        font-weight: bolder;
    }
    span:before{
        content: ' ';
        display: inline-block;
        width: 0.5em;
        height: 0.5em;
        margin-right: 0.5em;
        background-color: var(--font-color);
    }
}
</style>
