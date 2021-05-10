// Height and Width of Image
var Height = 650;
var Width = 540;

// Map is 40x40 m
var MapHeight = 40;
var MapWidth = 40;

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


// Camera page de calısmaması lazım.
const interval = setInterval(function() {
    calculateEuler();
}, 1000);

function mainPageOnLoad(){
    drawPoints();
    calculateEuler();
}

function cameraPageOnLoad(){
    getLeftCamera();
    getRightCamera();
}

function getOdom(){
    var odom = new ROSLIB.Topic({
        ros : ros,
        name : '/leo/leo_velocity_controller/odom',
        messageType : 'nav_msgs/Odometry'
    });

    odom.subscribe(function (message){
        var pose = message.pose.pose;
        var orientation = pose.orientation;
        var position = pose.position;

        console.log(message);

        /*document.getElementById("orientation-x").innerHTML = "Orientation X: " + orientation.x;
        document.getElementById("orientation-y").innerHTML = "Orientation Y: " + orientation.y;
        document.getElementById("orientation-z").innerHTML = "Orientation Z: " + orientation.z;
        document.getElementById("orientation-w").innerHTML = "Orientation W: " + orientation.w;

        document.getElementById("position-x").innerHTML = "Position X: " + position.x;
        document.getElementById("position-y").innerHTML = "Position Y: " + position.y;
        document.getElementById("position-z").innerHTML = "Position Z: " + position.z;*/
       
        odom.unsubscribe();
    });
}

function calculateEuler(){
    var imu = new ROSLIB.Topic({
        ros : ros,
        name : '/zed2/imu/data',
        messageType : 'sensor_msgs/Imu'
    });

    imu.subscribe(function (message) {
        //console.log(message);

        let x = message.orientation.x;
        let y = message.orientation.y;
        let z = message.orientation.z;
        let w = message.orientation.w;

        let yaw = Math.atan2(2.0*(y*z + w*x), w*w - x*x - y*y + z*z);
        let pitch = Math.asin(-2.0*(x*z - w*y));
        let roll = Math.atan2(2.0*(x*y + w*z), w*w + x*x - y*y - z*z);

        //console.log(yaw);
        //console.log(pitch);
        //console.log(roll);

        //document.getElementById("yaw").innerHTML = "Yaw : " + yaw;
        document.getElementById("pitch-p").innerHTML = /*"Pitch: " +*/ pitch.toFixed(2);
        document.getElementById("roll-p").innerHTML = /*"Roll: " +*/ roll.toFixed(2);

        w = 50 + pitch*15;
        $("#progress-bar-1").css("width", w + "%");

        y = 50 + roll*10;
        $("#progress-bar-2").css("width", y + "%");

        $("#rover-1").css("transform", "rotate(" + pitch*15 + "deg)");
        $("#rover-2").css("transform", "rotate(" + roll*5 + "deg)");

        imu.unsubscribe();
    });
}

function getLeftCamera(){
    var leftCamera = new ROSLIB.Topic({
        ros : ros,
        name : '/zed2/left/image_rect_color/compressed',
        messageType : 'sensor_msgs/CompressedImage'
    });

    leftCamera.subscribe(function (message){
        //console.log(message);
        document.getElementById("image").src = "data:image/png;base64," + message.data;

        leftCamera.unsubscribe();
    });
}

function getRightCamera(){
    var rightCamera = new ROSLIB.Topic({
        ros : ros,
        name : '/zed2/right/image_rect_color/compressed',
        messageType : 'sensor_msgs/CompressedImage'
    });

    rightCamera.subscribe(function (message){
        //console.log(message);
        document.getElementById("image2").src = "data:image/png;base64," + message.data;

        rightCamera.unsubscribe();
    });
}

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
