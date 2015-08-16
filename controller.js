require(['components/environment/environment.js', 'components/avatar/avatar.js'],
function(Environment,Avatar){

    function Controller () {
        
        this.environment = null;
        this.environmentState = null;
        this.avatar = null;
        
    }
    
    Controller.prototype.init = function () {
        this.environment = new Environment;
        this.environmentState = 'day';
        
        var newState;
        
        this.environment.changeState(this.environmentState);
        
        //setInterval(function(){
        //	if (this.environmentState == 'day')
        //		newState = 'night';
        //	else
        //		newState = 'day';
        //
        //    this.environment.changeState(newState);
        //    this.environmentState = newState;
        //}.bind(this),20000);

        this.avatar = new Avatar;
        this.avatar.init();
    };
    
    var controller = new Controller;
    controller.init();
});
