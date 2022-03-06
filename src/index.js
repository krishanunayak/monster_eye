import { select, selectAll } from "d3-selection";

const [width, height] = [innerWidth, innerHeight];
const [eyeCenterX, eyeCenterY, eyeRadius] = [0, 0, 100];
const eyeStrokeWidth = 5;
let [mousePosX, mousePosY] = [0, 0];
let [irisCenterX, irisCenterY] = [0, 0];
let [irisRadX, irisRadY] = [40, 40];

function mouseMove(mouseEvent) {
    mousePosX = mouseEvent.clientX;
    mousePosY = mouseEvent.clientY;
}

const svg = select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `${-width / 2} ${-height / 2} ${width} ${height}`)
    .on("mousemove", mouseMove);

svg.append("circle")
    .attr("cx", eyeCenterX)
    .attr("cy", eyeCenterY)
    .attr("r", eyeRadius - eyeStrokeWidth)
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", eyeStrokeWidth);

svg.append("ellipse")
    .attr("cx", irisCenterX)
    .attr("cy", irisCenterY)
    .attr("rx", irisRadX)
    .attr("ry", irisRadY)
    .style("fill", "black");
