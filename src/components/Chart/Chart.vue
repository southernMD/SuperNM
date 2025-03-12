<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";
import { watch } from "vue";
import { data } from '@/data'
const { timeChart,colorList } = data.chart

const props = withDefaults(defineProps<{
    width: number
    height: number
}>(), {
    width: 600,
    height: 400
})
const chartRef = ref<SVGSVGElement | null>(null);

const svgWidth = ref(props.width)
const svgHeight = ref(props.height)
watch(()=>props.width, () => {
    svgWidth.value = props.width
    svgHeight.value = props.height
    draw()
})
const draw = () => {
    const keys = Object.keys(timeChart[0]).filter((key) => key !== "age")
    const stack = d3.stack().keys(keys);
    const stackedData = stack(timeChart);

    const width = svgWidth.value
    const height = svgHeight.value;
    console.log(width, height);
    const fontSize = width < 600 ? "1em" : "1.5em"
    console.log(fontSize);
    const x = d3
        .scaleLinear()
        .domain([-1, 28])
        .range([0, width]);

    const y = d3
        .scaleLinear()
        .domain([0, 100])
        .nice()
        .range([height, 0]);

    const color = d3
        .scaleOrdinal()
        .domain(keys)
        .range(colorList);

    const area = d3
        .area()
        .x((d) => x(d.data.age))
        .y0((d) => y(d[0]))
        .y1((d) => y(d[1]))
        .curve(d3.curveBasis);

    const svg = d3.select(chartRef.value);
    svg.selectAll("*").remove();

    // 画流图
    const groups = svg
        .append("g")
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g");

    groups
        .append("path")
        .attr("d", area)
        .attr("stroke-width", 0)
        .attr("stroke", "#fff")
        .on("mouseover", function () {
            d3.select(this)
                .transition()
                .duration(300)
                .attr("stroke-width", 5);
        })
        .on("mouseout", function () {
            d3.select(this)
                .transition()
                .duration(300)
                .attr("stroke-width", 0);
        })
        .attr("fill", (d) => color(d.key) as string);

    // 添加文本标签
    function getCentroid(series: any[]) {
        const upper = series.map((d: any) => [x(d.data.age), y(d[1])]);
        const lower = series.slice().reverse().map((d: any) => [x(d.data.age), y(d[0])]);
        const polygon = [...upper, ...lower];
        return d3.polygonCentroid(polygon as [number, number][]);
    }
    // groups
    //     .append("path")
    //     .attr("class", "polygon")
    //     .attr("d", (d) => {
    //         const upper = d.map((point: any) => [x(point.data.age), y(point[1])]);
    //         const lower = d.slice().reverse().map((point: any) => [x(point.data.age), y(point[0])]);
    //         const polygon = [...upper, ...lower];
    //         return `M${polygon.join("L")}Z`;
    //     })
    //     .attr("stroke", "#000")
    //     .attr("stroke-width", 1)
    //     .attr("fill", "none");

    groups
        .append("text")
        .attr("transform", function (d) {
            const [centroidX, centroidY] = getCentroid(d);
            return `translate(${centroidX}, ${centroidY})`;
        })
        .attr("text-anchor", "middle")
        .attr("font-size", fontSize)
        .attr("font-family", "ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji")
        .attr("fill", "#334155")
        .text((d) => capitalizeFirstLetter(d.key));
    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // 纵坐标（20% 间隔, 不显示 0% 和 100%）
    svg.append("g")
        .selectAll("g")
        .data([20, 40, 60, 80])
        .enter()
        .append("g")
        .each(function (d) {
            const g = d3.select(this);
            g.append("text")
                .attr("y", y(d) + 5)
                .attr("x", 15)
                .attr("fill", "#333")
                .attr("font-size", fontSize)
                .attr("text-anchor", "start")
                .text(`${d}%`);

            g.append("line")
                .attr("x1", 10) // 线的起始点（靠近坐标轴）
                .attr("y1", y(d)) // 线的垂直位置
                .attr("x2", 0)  // 线的结束点（与坐标轴对齐）
                .attr("y2", y(d))
                .attr("stroke", "#000"); // 线的颜色
        });

    // 横坐标（间隔 5）
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .selectAll("g")
        .data(d3.range(0, 26, 5))
        .enter()
        .append("g")
        .each(function (d) {
            const g = d3.select(this);
            g.append("text")
                .attr("x", x(d))
                .attr("y", -15)
                .attr("fill", "#333")
                .attr("font-size", fontSize)
                .attr("text-anchor", "middle")
                .text(d);

            g.append("line")
                .attr("x1", x(d)) // 辅助线水平位置
                .attr("x2", x(d))
                .attr("y1", 0) // 辅助线起始点（靠近坐标轴）
                .attr("y2", -10) // 辅助线结束点（与坐标轴对齐）
                .attr("stroke", "#000") // 辅助线颜色
        });
}
onMounted(() => {
    if (!chartRef.value) return;
    draw()
});
</script>

<template>
    <svg ref="chartRef" :width="svgWidth" :height="svgHeight"></svg>
</template>

<style scoped>
svg {
    border-radius: .5rem;
}
</style>
