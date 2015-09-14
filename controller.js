require(['components/avatar/avatar.js', 'components/environment/environment.js', 'components/world/world.js'],
function(Avatar,Environment,World){

    function Controller () {
        
        this.environment = null;
        this.avatar = null;
        this.currentStateIndex = 0;
        this.environmentStates = ['day','night'];
        window.keysDown = [];
    }
    
    Controller.prototype.init = function () {
        this.environment = new Environment;
        this.environment.changeState('day');

        this.avatar = new Avatar;

        this.world = new World;

        this.world.changeWorld('all');

        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        document.addEventListener('click',this.onClick.bind(this), false);
    };

    Controller.prototype.onKeyDown = function (event) {
        if (window.keysDown.indexOf(event.which) != -1) return;
        window.keysDown.push(event.which);
        console.log('key down',window.keysDown);

        switch (event.which) {
            case 32:
                if (!this.environment.inTransition && this.currentStateIndex === 0)
                    this.currentStateIndex = 1;
                else if (!this.environment.inTransition)
                    this.currentStateIndex = 0;

                this.currentEnvironmentState = this.environmentStates[this.currentStateIndex];
                this.environment.changeState(this.currentEnvironmentState);
                break;
            case 40:
                this.avatar.doAction('guitar');
                break;
            case 37:
                this.avatar.doAction('walk-left');
                break;
            case 38:
                this.avatar.doAction('jump');
                break;
            case 39:
                this.avatar.doAction('walk-right');
                break;
        }
    };

    Controller.prototype.onKeyUp = function (event) {
        var index = window.keysDown.indexOf(event.which);
        window.keysDown.splice(index, 1);
        console.log('key up',window.keysDown);
    };

    Controller.prototype.onClick = function(event) {
        var newPosition = {
            bottom: 110,
            left: event.x-50
        };
        this.avatar.doAction('walk-to',newPosition);
    };

    var controller = new Controller;
    controller.init();
});
