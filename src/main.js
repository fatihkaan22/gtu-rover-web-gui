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

/*const interval = setInterval(function() {

}, 5000);*/

function getJointStates(){
    var jointStates = new ROSLIB.Topic({
        ros : ros,
        name : '/leo/joint_states',
        messageType : 'sensor_msgs/JointState'
    });

    jointStates.subscribe(function (message) {
        var names = message.name;
        var positions = message.position;
        var velocities = message.velocity;

        console.log(message);
        
        for(let i=0;i<names.length;++i){
            console.log(names[i]);
            console.log(positions[i]);
            console.log(velocities[i]);
        }

        jointStates.unsubscribe();
    });
}

function getX(){
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

        console.log("Orientation X : %s",orientation.x);
        console.log("Orientation Y : %s",orientation.y);
        console.log("Orientation Z : %s",orientation.z);
        console.log("Orientation W : %s",orientation.w);
        
        console.log("Position X : %s",position.x);
        console.log("Position Y : %s",position.y);
        console.log("Position Z : %s",position.z);

        odom.unsubscribe();
    });
}