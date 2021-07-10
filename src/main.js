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

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ( (charCode > 31 && charCode < 48) || charCode > 57) {
        return false;
    }
    return true;
}