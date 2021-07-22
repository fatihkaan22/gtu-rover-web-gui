// Height and Width of Image
var Width = 1338;
var Height = 1570;

var MapScale = 2;

var offset = 10;
var startingPointX = 0;
var startingPointY = 0;

/*var points = [
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
];*/

//var py=(ch - ((y/ch*ih) - event.pageY))

$(document).ready(function() {
    $("#map-image").on("click", function(event) {
        bounds=this.getBoundingClientRect();
        var left=bounds.left;
        var top=bounds.top;
        var x = event.pageX - left;
        var y = event.pageY - top;
        var cw=this.clientWidth
        var ch=this.clientHeight
        var iw=this.naturalWidth
        var ih=this.naturalHeight
        var scale = iw/cw;
        var px=((x/cw*iw) / scale)
        var py=(ch - ((y/ch*ih) / scale) + top);

        //alert("Coordinates : ("+px+","+py+")\nClientImage : ("+cw+" x "+ch+")\nNaturalImage : ("+iw+" x "+ih+")\n")
        drawWaypointWithArguments(px,py)

        var distanceFromStartingPointX = px * MapScale - startingPointX;
        var distanceFromStartingPointY = py * MapScale - startingPointY;
        var distance = Math.sqrt(Math.pow(distanceFromStartingPointX,2) + Math.pow(distanceFromStartingPointY,2)); 

        document.getElementById("distance-x").innerHTML = Math.round(distanceFromStartingPointX);
        document.getElementById("distance-y").innerHTML = Math.round(distanceFromStartingPointY);
        document.getElementById("distance").innerHTML = Math.round(distance);
    });
});

function drawPoints(){
    /*var widthConstant = Width / MapWidth;
    var heightConstant = Height / MapHeight;
    var pointsDiv = document.getElementById("points");

    for(let i=0;i<points.length;i++){
        var hex = document.createElement("div");
        hex.classList.add("hexagon");
        hex.classList.add("hexagon:before");
        hex.classList.add("hexagon:after");

        let x = points[i][0];
        let y = points[i][1];

        let left = startingPointX + widthConstant*x;
        let bottom = startingPointY + heightConstant*y;

        hex.style.left = left + "px";
        hex.style.bottom = bottom + "px";

        pointsDiv.appendChild(hex);
    }*/
}

function drawWaypoint(){
    var color = document.getElementById("colorInput").value;
    var x = document.getElementById("textAreaX").value;
    var y = document.getElementById("textAreaY").value;

    var pointsDiv = document.getElementById("points");

    var hex = document.createElement("div");
    hex.classList.add("start-circle");

    hex.style.left = (startingPointX + x) + "px";
    hex.style.bottom = (startingPointY + y) + "px";
    hex.style.backgroundColor = color;

    pointsDiv.appendChild(hex);
}

function drawWaypointWithArguments(x,y){
    // Remove previous point
    const myNode = document.getElementById("points");
    myNode.innerHTML = "";

    var color = "blue";

    var pointsDiv = document.getElementById("points");

    var hex = document.createElement("div");
    hex.classList.add("start-circle");

    hex.style.left = (startingPointX + x - 10) + "px";
    hex.style.bottom = (startingPointY + y - 10) + "px";
    hex.style.backgroundColor = color;

    pointsDiv.appendChild(hex);
}
