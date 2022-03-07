import { select, selectAll } from "d3-selection";
import { scaleLinear, scaleRadial } from "d3-scale";
import { transition, duration, transform } from "d3-transition";

const [width, height] = [innerWidth, innerHeight];
const [eyeCenterX, eyeCenterY, eyeRadius] = [0, 0, 100];
const eyeInnerRadius = 65;
const eyeStrokeWidth = 5;
let [mousePosX, mousePosY] = [0, 0];
let [irisCenterX, irisCenterY] = [0, 0];
let [irisRadiusX, irisRadiusY] = [40, 40];
let [irisMinRadiusX, irisMinRadiusY] = [30, 35];

const minDist = Math.min(width, height);
const maxDist = Math.max(width, height);
const irisCenterScale = scaleLinear()
    .domain([
        0,
        (minDist * minDist) / 4,
        (minDist * minDist) / 4 + (maxDist * maxDist) / 4,
    ])
    .range([
        0,
        eyeInnerRadius * eyeInnerRadius,
        eyeInnerRadius * eyeInnerRadius,
    ]);
const irisRadiusScaleX = scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([irisRadiusX, irisMinRadiusX]);
const irisRadiusScaleY = scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([irisRadiusY, irisMinRadiusY]);
function mapMousePos(x, y) {
    return [x - width / 2, y - height / 2];
}
function mouseMove(mouseEvent) {
    [mousePosX, mousePosY] = mapMousePos(
        mouseEvent.clientX,
        mouseEvent.clientY
    );
    const R = Math.sqrt(
        irisCenterScale(mousePosX * mousePosX + mousePosY * mousePosY)
    );
    const theta = Math.atan2(mousePosY, mousePosX);
    irisCenterX = R * Math.cos(theta);
    irisCenterY = R * Math.sin(theta);
    irisRadiusX = irisRadiusScaleX(R);
    irisRadiusY = irisRadiusScaleY(R);
    iris.transition()
        .duration(10)
        .attr("cx", irisCenterX)
        .attr("cy", irisCenterY)
        .attr("rx", irisRadiusX)
        .attr("ry", irisRadiusY)
        .attr(
            "transform",
            `rotate(${(theta * 180) / Math.PI} ${irisCenterX} ${irisCenterY})`
        );
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
