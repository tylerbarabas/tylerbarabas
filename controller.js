require(['components/environment/environment.js', 'components/avatar/avatar.js'],
function(Environment,Avatar){

    var env = new Environment,
    currentState = 'day',
    newState;
    env.changeState(currentState);
    setInterval(function(){
    	console.log('fired!',currentState);

    	if (currentState == 'day')
    		newState = 'night';
    	else 
    		newState = 'day';

        env.changeState(newState);
        currentState = newState;
    },20000);

    var avatar = new Avatar;
    avatar.init();

});
