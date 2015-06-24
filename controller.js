require(['components/environment.js'],function(Environment){

    var env = new Environment;
    setTimeout(function(){
        env.changeState('night');
    },10000);

});