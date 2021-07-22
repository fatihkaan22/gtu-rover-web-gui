// Height and Width of Image
var Width = 1338;
var Height = 1570;

var MapScale = 2;

var offset = 5;
var startingPointX = 0;
var startingPointY = 0;

var points = [];
var totalPoint = 0;

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
        var py=(ch - ((y/ch*ih) / scale))

        //alert("Coordinates : ("+px+","+py+")\nClientImage : ("+cw+" x "+ch+")\nNaturalImage : ("+iw+" x "+ih+")\n")
        drawWaypointWithArguments(px,py)

        var distanceFromStartingPointX = px * MapScale - startingPointX;
        var distanceFromStartingPointY = py * MapScale - startingPointY;
        var distance = Math.sqrt(Math.pow(distanceFromStartingPointX,2) + Math.pow(distanceFromStartingPointY,2)); 

        document.getElementById("distance-x").innerHTML = Math.round(distanceFromStartingPointX) + " px";
        document.getElementById("distance-y").innerHTML = Math.round(distanceFromStartingPointY) + " px";
        document.getElementById("distance").innerHTML = Math.round(distance) + " px";
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

    var hex = document.createElement("div");
    hex.classList.add("start-circle");
    hex.id = "point"+totalPoint;

    hex.style.left = (startingPointX + x - offset) + "px";
    hex.style.bottom = (startingPointY + y - offset) + "px";
    hex.style.backgroundColor = color;

    myNode.appendChild(hex);
}

function AddToWaypoints(){
    const myNode = document.getElementById("saved_points");

    const point = document.getElementById("point"+(totalPoint++));

    var x = point.style.left;
    var y = point.style.bottom;

    x = x.substr(0,x.length-2);
    y = y.substr(0,y.length-2);

    x *= MapScale;
    y *= MapScale;

    x += offset*MapScale;
    y += offset*MapScale;

    points.push([Math.round(x),Math.round(y)]);

    console.log(points);

    myNode.appendChild(point);
}