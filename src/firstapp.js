// Her 2 saniyede bir çalışan fonksiyon
setInterval(function() {
    var element1 = document.getElementById("pitch-p");
    var element2 = document.getElementById("roll-p");

    var zedLeftImage = document.getElementById("image");
    var zedRightImage = document.getElementById("image2");

    if(element1 != null && element2 != null){
        calculateEuler();
    }

    if(zedLeftImage != null && zedRightImage != null){
        getLeftCamera();
        getRightCamera();
    }
}, 2000);


// Main page yüklendiğinde çalışan fonksiyon
function mainPageOnLoad(){
    console.log("main page on laod");
    drawPoints();
    calculateEuler();
}

// Camera page yüklendiğinde çalışan fonksiyon
function cameraPageOnLoad(){
    console.log("camera page on laod");
    getLeftCamera();
    getRightCamera();
}

// Roll ve Pitch hesaplanır
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

        //document.getElementById("yaw").innerHTML = "Yaw : " + yaw;
        var element1 = document.getElementById("pitch-p");
        var element2 = document.getElementById("roll-p");

        if(element1 != null && element2 != null){
            let yaw = Math.atan2(2.0*(y*z + w*x), w*w - x*x - y*y + z*z);
            let pitch = Math.asin(-2.0*(x*z - w*y));
            let roll = Math.atan2(2.0*(x*y + w*z), w*w + x*x - y*y - z*z);

            element1.innerHTML = /*"Pitch: " +*/ pitch.toFixed(2);
            element2.innerHTML = /*"Roll: " +*/ roll.toFixed(2);

            w = 50 + pitch*15;
            $("#progress-bar-1").css("width", w + "%");

            y = 50 + roll*10;
            $("#progress-bar-2").css("width", y + "%");

            $("#rover-1").css("transform", "rotate(" + pitch*15 + "deg)");
            $("#rover-2").css("transform", "rotate(" + roll*5 + "deg)");
        }

        imu.unsubscribe();
    });
}

// Left Camera
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

// Right Camera
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