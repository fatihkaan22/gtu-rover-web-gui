// Height and Width of Image
var Width = 1338;
var Height = 1570;

// Map is 40x40 m
var MapWidth = 134;
var MapHeight = 157;

var starting_point_x = 120;
var starting_point_y = 400;

var points = [
    [7.31,0.00],
    [7.19,7.55],
    [18.85,-3.59],
    [33.77,6.41],
    [13.22,-13.61],
    [21.01,13.21],
    [20.96,3.36],
    [20.40,-19.41],
    [14.77,6.89],
    [22.46,-10.36],
    [31.56,-18.81],
    [29.92,11.44],
    [32.79,-6.79],
    [2.04,-12.02],
    [7.63,13.24]
];

// Bu map ters(düzeltilip 40x25 yapılmalı (şu an 40x40))
function drawPoints(){
    var width_constant = Width / MapWidth;
    var height_constant = Height / MapHeight;
    var pointsDiv = document.getElementById("points");

    for(let i=0;i<points.length;i++){
        var hex = document.createElement("div");
        hex.classList.add("hexagon");
        hex.classList.add("hexagon:before");
        hex.classList.add("hexagon:after");

        let x = points[i][0];
        let y = points[i][1];

        let left = starting_point_x + width_constant*x;
        let bottom = starting_point_y + height_constant*y;

        hex.style.left = left + "px";
        hex.style.bottom = bottom + "px";

        pointsDiv.appendChild(hex);
    }
}

function drawWaypoint(){
    var color = document.getElementById("colorInput").value;
    var x = document.getElementById("textAreaX").value;
    var y = document.getElementById("textAreaY").value;

    var width_constant = Width / MapWidth;
    var height_constant = Height / MapHeight;
    var pointsDiv = document.getElementById("points");

    var hex = document.createElement("div");
    hex.classList.add("start-circle");

    let left = starting_point_x + width_constant*x;
    let bottom = starting_point_y + height_constant*y;

    hex.style.left = left + "px";
    hex.style.bottom = bottom + "px";
    hex.style.backgroundColor = color;


    pointsDiv.appendChild(hex);
}
