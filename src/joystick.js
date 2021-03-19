createJoystick = function () {
    var options = {
      zone: document.getElementById('zone_joystick'),
      threshold: 0.2,
      position: { left: 20 + '%' },
      mode: 'static',
      size: 120,
      color: '#431b4a',
    };
    manager = nipplejs.create(options);

    linear_speed = 0;
    angular_speed = 0;

    self.manager.on('start', function (event, nipple) {
        timer = setInterval(function () {
          move(linear_speed, angular_speed);
        }, 25);
    });
    
    self.manager.on('end', function () {
        if (timer) {
          clearInterval(timer);
        }
        self.move(0, 0);
    });
    
    self.manager.on('move', function (event, nipple) {
        max_linear = 5.0; // m/s
        max_angular = 2.0; // rad/s
        max_distance = 75.0; // pixels;
        linear_speed = Math.sin(nipple.angle.radian) * max_linear * nipple.distance/max_distance;
        angular_speed = -Math.cos(nipple.angle.radian) * max_angular * nipple.distance/max_distance;
    });
}

function move(linear_speed,angular_speed){
    //console.log(linear_speed);
    //console.log(angular_speed);

    var cmdVel = new ROSLIB.Topic({
        ros : ros,
        name : '/leo/leo_velocity_controller/cmd_vel',
        messageType : 'geometry_msgs/Twist'
    });

    cmdVel.subscribe(function (message) {
        /* JSON data */
        //encodedData = JSON.stringify(message);
        //console.log(encodedData);

        //console.log(message.linear);
        //console.log(message.angular);
        
        document.getElementById("demo-linear-x").innerHTML = "Linear X : " + message.linear.x;
        document.getElementById("demo-linear-y").innerHTML = "Linear Y : " + message.linear.y;
        document.getElementById("demo-linear-z").innerHTML = "Linear Z : " + message.linear.z;
        
        document.getElementById("demo-angular-x").innerHTML = "Angular X : " + message.angular.x;
        document.getElementById("demo-angular-y").innerHTML = "Angular Y : " + message.angular.y;
        document.getElementById("demo-angular-z").innerHTML = "Angular Z : " + message.angular.z;
    });

    //console.log(cmdVel);

    var twist = new ROSLIB.Message({
        linear : {
            x : linear_speed,
            y : 0.0,
            z : 0.0
        },
        angular : {
            x : 0.0,
            y : 0.0,
            z : angular_speed
        }
    });
    
    console.log('Publishing cmd_vel');
    cmdVel.publish(twist);
}

window.onload = function () {
    createJoystick();
}