import * as d3 from "d3";

const [width, height] = [innerWidth, innerHeight];
const [eyeCenterX, eyeCenterY, eyeRadius] = [0, 0, 100];
const eyeInnerRadius = 52;
const eyeStrokeWidth = 5;
let [mousePosX, mousePosY] = [0, 0];
let [irisCenterX, irisCenterY] = [0, 0];
let [irisRadiusX, irisRadiusY] = [50, 50];
let [irisMinRadiusX, irisMinRadiusY] = [38, 45];
let [pupilCenterX, pupilCenterY] = [0, 0];
let [pupilRadiusX, pupilRadiusY] = [20, 20];
let [pupilMinRadiusX, pupilMinRadiusY] = [13, 17];

const minDist = Math.min(width, height);
const maxDist = Math.max(width, height);

const irisCenterScale = d3
    .scaleLinear()
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
const irisRadiusScaleX = d3
    .scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([irisRadiusX, irisMinRadiusX]);
const irisRadiusScaleY = d3
    .scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([irisRadiusY, irisMinRadiusY]);

const pupilCeterScale = d3
    .scaleLinear()
    .domain([
        0,
        (minDist * minDist) / 4,
        (minDist * minDist) / 4 + (maxDist * maxDist) / 4,
    ])
    .range([
        0,
        eyeInnerRadius * eyeInnerRadius + 2000,
        eyeInnerRadius * eyeInnerRadius + 2000,
    ]);
const pupilRadiusScaleX = d3
    .scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([pupilRadiusX, pupilMinRadiusX]);
const pupilRadiusScaleY = d3
    .scaleLinear()
    .domain([0, eyeInnerRadius])
    .range([pupilRadiusY, pupilMinRadiusY]);

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
    const r = Math.sqrt(
        pupilCeterScale(mousePosX * mousePosX + mousePosY * mousePosY)
    );
    pupilCenterX = r * Math.cos(theta);
    pupilCenterY = r * Math.sin(theta);
    pupilRadiusX = pupilRadiusScaleX(r);
    pupilRadiusY = pupilRadiusScaleY(r);
    pupil
        .transition()
        .duration(10)
        .attr("cx", pupilCenterX)
        .attr("cy", pupilCenterY)
        .attr("rx", pupilRadiusX)
        .attr("ry", pupilRadiusY)
        .attr(
            "transform",
            `rotate(${(theta * 180) / Math.PI} ${pupilCenterX} ${pupilCenterY})`
        );
}

const svg = d3
    .select("body")
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
    .style("fill", "gray");

const pupil = group
    .append("ellipse")
    .attr("id", "pupil")
    .attr("cx", pupilCenterX)
    .attr("cy", pupilCenterY)
    .attr("rx", pupilRadiusX)
    .attr("ry", pupilRadiusY)
    .style("fill", "black");
