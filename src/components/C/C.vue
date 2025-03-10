<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as d3 from "d3";

const chartRef = ref<SVGSVGElement | null>(null);

onMounted(() => {
    if (!chartRef.value) return;

    const data = [
        { age: -1, study: 0, game: 0, coding: 0, music: 0, social: 100 },
        { age: 5, study: 50, game: 20, coding: 0, music: 3, social: 27 },
        { age: 10, study: 40, game: 30, coding: 0, music: 5, social: 25 },
        { age: 15, study: 35, game: 25, coding: 0, music: 7, social: 33 },
        { age: 20, study: 30, game: 20, coding: 30, music: 10, social: 10 },
        { age: 25, study: 20, game: 10, coding: 50, music: 15, social: 5 },
        { age: 28, study: 20, game: 10, coding: 50, music: 15, social: 5 },
    ];

    const stack = d3.stack().keys(["study", "game", "coding", "music", "social"]);
    const stackedData = stack(data);
    console.log(stackedData);

    const width = 650;
    const height = 400;

    const x = d3
        .scaleLinear()
        .domain([-1, 30])
        .range([0, width]);

    const y = d3
        .scaleLinear()
        .domain([0, 100])
        .nice()
        .range([height, 0]);

    const color = d3
        .scaleOrdinal()
        .domain(["study", "game", "coding", "music", "social"])
        .range(["#66CCFF", "#ADD8E6", "#90EE90", "#87CEFA", "#32CD32"]);

    const area = d3
        .area()
        .x((d) => {
            console.log(d);
            return x(d.data.age)
        })
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
       function getMaxValueIndex(series: any[]) {
        let maxValue = -Infinity;
        let maxIndex = -1;
        console.log(series);
        series.forEach((d: number[], i: number) => {
            const value = d[1] - d[0];
            
            if (value > maxValue) {
                maxValue = value;
                maxIndex = i;
            }
        });
        return maxIndex;
    }

    groups
        .append("text")
        .attr("transform", function (d) {
            const maxIndex = getMaxValueIndex(d);
            const midAge = d[maxIndex].data.age;
            const midY = (y(d[maxIndex][0]) + y(d[maxIndex][1])) / 2;

            const xMidAge = x(midAge);
            const buffer = 20; 

            if (xMidAge < buffer || xMidAge > width - buffer) {
                const startAge = d[0].data.age;
                const endAge = d[d.length - 1].data.age;
                const midAgeAdjusted = (startAge + endAge) / 2;
                return `translate(${x(midAgeAdjusted)}, ${midY})`;
            } else {
                return `translate(${xMidAge}, ${midY})`;
            }
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text((d) => d.key);

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
                .attr("text-anchor", "middle")
                .text(d);

            g.append("line")
                .attr("x1", x(d)) // 辅助线水平位置
                .attr("x2", x(d))
                .attr("y1", 0) // 辅助线起始点（靠近坐标轴）
                .attr("y2", -10) // 辅助线结束点（与坐标轴对齐）
                .attr("stroke", "#000") // 辅助线颜色
        });
});
</script>

<template>
    <svg ref="chartRef" width="600" height="400"></svg>
</template>

<style scoped>
svg{
    border-radius: .5rem;
}
</style>
