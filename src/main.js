var ros = new ROSLIB.Ros({
    url : 'ws://localhost:9090'
});

ros.on('connection',function(){
    console.log('Connected');
});

ros.on('error',function(){
    console.log('ERROR');
});

ros.on('close',function(){
    console.log('Close');
});

// Refresh values for every 5000 miliseconds (5 sn)
const interval = setInterval(function() {
    //getCmdVel();
}, 5000);

/* Doesn't work, i don't know why */
function getCmdVel(){
    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });

    cmdVel.subscribe(function (message) {
        console.log(message);

        document.getElementById("demo-linear-x").innerHTML = "Linear X : " + message.linear.x;
        document.getElementById("demo-linear-y").innerHTML = "Linear Y : " + message.linear.y;
        document.getElementById("demo-linear-z").innerHTML = "Linear Z : " + message.linear.z;
        
        document.getElementById("demo-angular-x").innerHTML = "Angular X : " + message.angular.x;
        document.getElementById("demo-angular-y").innerHTML = "Angular Y : " + message.angular.y;
        document.getElementById("demo-angular-z").innerHTML = "Angular Z : " + message.angular.z;
    
        cmdVel.unsubscribe();
    });
}

function getJointStates(){
    var jointStates = new ROSLIB.Topic({
        ros : ros,
        name : '/joint_states',
        messageType : 'sensor_msgs/JointState'
    });

    jointStates.subscribe(function (message) {
        var names = message.name;
        var positions = message.position;
        var velocities = message.velocity;

        console.log(message);
        
        for(let i=0;i<names.length;++i){
            document.getElementById("joint-"+i).innerHTML = names[i] + ": "
                +  positions[i] + "(Pos) - " + velocities[i] + "(Vel)";
            
            /*
            console.log(names[i]);
            console.log(positions[i]);
            console.log(velocities[i]);
            */
        }
        jointStates.unsubscribe();
    });
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

        document.getElementById("orientation-x").innerHTML = "Orientation X: " + orientation.x;
        document.getElementById("orientation-y").innerHTML = "Orientation Y: " + orientation.y;
        document.getElementById("orientation-z").innerHTML = "Orientation Z: " + orientation.z;
        document.getElementById("orientation-w").innerHTML = "Orientation W: " + orientation.w;

        document.getElementById("position-x").innerHTML = "Position X: " + position.x;
        document.getElementById("position-y").innerHTML = "Position Y: " + position.y;
        document.getElementById("position-z").innerHTML = "Position Z: " + position.z;

        /*
        console.log("Orientation X : %s",orientation.x);
        console.log("Orientation Y : %s",orientation.y);
        console.log("Orientation Z : %s",orientation.z);
        console.log("Orientation W : %s",orientation.w);
        
        console.log("Position X : %s",position.x);
        console.log("Position Y : %s",position.y);
        console.log("Position Z : %s",position.z);
        */
        odom.unsubscribe();
    });
}

function getIMU(){
    var imu = new ROSLIB.Topic({
        ros : ros,
        name : '/zed2/imu/data',
        messageType : 'sensor_msgs/Imu'
    });

    imu.subscribe(function (message) {
        console.log(message);

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