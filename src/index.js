import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleRadial } from "d3-scale";
import { transition, duration } from "d3-transition";

const [width, height] = [innerWidth, innerHeight];
const [eyeCenterX, eyeCenterY, eyeRadius] = [0, 0, 100];
const eyeStrokeWidth = 5;
let [mousePosX, mousePosY] = [0, 0];
let [irisCenterX, irisCenterY] = [0, 0];
let [irisRadiusX, irisRadiusY] = [40, 40];

const irisCenterXScale = scaleLinear()
    .domain([0, width / 2, width])
    .range([-eyeRadius, 0, eyeRadius]);
const irisCenterYScale = scaleLinear()
    .domain([0, height / 2, height])
    .range([-eyeRadius, 0, eyeRadius]);

function mouseMove(mouseEvent) {
    mousePosX = mouseEvent.clientX;
    mousePosY = mouseEvent.clientY;

    select("#iris")
        .transition()
        .duration(10)
        .attr("cx", irisCenterXScale(mousePosX))
        .attr("cy", irisCenterYScale(mousePosY));
}

const svg = select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
    .on("mousemove", mouseMove);

const group = svg.append("g");

const eye = group
    .append("circle")
    .attr("cx", eyeCenterX)
    .attr("cy", eyeCenterY)
    .attr("r", eyeRadius - eyeStrokeWidth)
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", eyeStrokeWidth);

const iris = group
    .append("ellipse")
    .attr("id", "iris")
    .attr("cx", irisCenterX)
    .attr("cy", irisCenterY)
    .attr("rx", irisRadiusX)
    .attr("ry", irisRadiusY)
    .style("fill", "black");
