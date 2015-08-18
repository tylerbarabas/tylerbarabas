require(['components/environment/environment.js', 'components/avatar/avatar.js'],
function(Environment,Avatar){

    function Controller () {
        
        this.environment = null;
        this.avatar = null;
        this.currentStateIndex = 0;
        this.environmentStates = ['day','night'];
        this.keysDown = [];
    }
    
    Controller.prototype.init = function () {
        this.environment = new Environment;
        this.environment.changeState('day');

        this.avatar = new Avatar;

        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        document.addEventListener('click',this.onClick.bind(this), false);
    };

    Controller.prototype.onKeyDown = function (event) {
        if (this.keysDown.indexOf(event.which) != -1) return;
        this.keysDown.push(event.which);

        switch (event.which) {
            case 40:
                if (!this.environment.inTransition && this.currentStateIndex === 0)
                    this.currentStateIndex = 1;
                else if (!this.environment.inTransition)
                    this.currentStateIndex = 0;

                this.currentEnvironmentState = this.environmentStates[this.currentStateIndex];
                this.environment.changeState(this.currentEnvironmentState);
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
        var index = this.keysDown.indexOf(event.which);
        this.keysDown.splice(index, 1);

        if (this.keysDown.length < 1) {
            switch(event.which) {
                case 37:
                case 39:
                    this.avatar.doAction('idle');
                    break;
            }
        }
    };

    Controller.prototype.onClick = function(event) {
        var newPosition = {
            bottom: 150,
            left: event.x-50
        };
        this.avatar.doAction('walk-to',newPosition);
    };
    
    var controller = new Controller;
    controller.init();
});
