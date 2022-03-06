import { select, selectAll } from "d3-selection";

const [width, height] = [innerWidth, innerHeight];
const [svgWidth, svgHeight] = [200, 200];
const [eyeCenterX, eyeCenterY, eyeRadius] = [0, 0, svgWidth / 2];
const eyeStrokeWidth = 5;

const svg = select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr(
        "transform",
        `translate(${width / 2 - svgWidth / 2} ${height / 2 - svgHeight / 2})`
    )
    .attr(
        "viewBox",
        `${-svgWidth / 2} ${-svgHeight / 2} ${svgWidth} ${svgHeight}`
    );

svg.append("circle")
    .attr("cx", eyeCenterX)
    .attr("cy", eyeCenterY)
    .attr("r", eyeRadius - eyeStrokeWidth)
    .style("fill", "none")
    .style("stroke", "black")
    .style("stroke-width", eyeStrokeWidth);
