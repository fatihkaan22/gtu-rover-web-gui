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
/*const interval = setInterval(function() {
    //getCmdVel();
}, 5000);*/

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

