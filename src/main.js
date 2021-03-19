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