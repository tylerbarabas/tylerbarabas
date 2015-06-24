require(['components/environment/environment.js', 'components/avatar/avatar.js'],
function(Environment,Avatar){

    var env = new Environment;
    setTimeout(function(){
        env.changeState('night');
    },10000);

    var avatar = new Avatar;
    avatar.init();

});
