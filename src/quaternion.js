window.onload = function() {
    getLeftCamera();
    getRightCamera();
    calculateEuler();
};
const interval = setInterval(function() {
    calculateEuler();
}, 3000);

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

        y = 50 + roll*15;
        $("#progress-bar-2").css("width", y + "%");

        $("#rover-1").css("transform", "rotate(" + pitch*15 + "deg)");
        $("#rover-2").css("transform", "rotate(" + roll*15 + "deg)");

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