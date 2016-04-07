require(['components/avatar/avatar', 'components/environment/environment', 'components/world/world', 'lib/screen_compatible/screen_compatible', 'components/modal_developer/modal_developer', 'components/modal_songwriter/modal_songwriter'],
function(Avatar,Environment,World,ScreenCompatible, ModalDeveloper, ModalSongwriter){

    function Controller () {

        this.environment = Environment;
        this.currentStateIndex = 0;
        this.environmentStates = ['day','night'];
        window.keysDown = [];
        ScreenCompatible.init();
    }

    Controller.prototype.init = function () {
        this.world = World;

        this.world.changeWorld('all');

        this.modalDeveloper = ModalDeveloper;
        this.modalSongwriter = ModalSongwriter;

        var xIcons = document.getElementsByClassName('x-icon');
        this.xIcons = [];
        for (var i=0;i<xIcons.length;i++){
          this.xIcons.push(xIcons[i]);
        }

        var titles = document.getElementsByClassName('title');
        this.titles = [];
        for (i=0;i<titles.length;i++){
          this.titles.push(titles[i]);
        }

        this.stage = document.getElementById('stage');
        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
        document.addEventListener('click',this.onClick.bind(this), false);
            
        var frames = document.getElementsByClassName('frame');
        
        for (i=0;i<frames.length;i++) {
          var f = frames[i];
          f.contentWindow.location.href = f.src;
        }
    };

    Controller.prototype.onKeyDown = function (event) {
        if (window.keysDown.indexOf(event.which) != -1) return;
        window.keysDown.push(event.which);

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
                Avatar.doAction('guitar');
                break;
            case 37:
                Avatar.doAction('walk-left');
                break;
            case 38:
                Avatar.doAction('jump');
                break;
            case 39:
                Avatar.doAction('walk-right');
                break;
        }
    };

    Controller.prototype.onKeyUp = function (event) {
        var index = window.keysDown.indexOf(event.which);
        window.keysDown.splice(index, 1);
    };

    Controller.prototype.onClick = function(event) {
      if (event.target ===  document.getElementById('shadow') || this.titles.indexOf(event.target) !== -1) {
        Avatar.doAction('walk-to',{bottom: 110,left: event.clientX - ((window.innerWidth - (this.stage.clientWidth*window.pageScale))/2) - ((Avatar.domContainer.offsetWidth*window.pageScale)*0.6)});
      } else if (this.xIcons.indexOf(event.target) !== -1) {
        this.modalDeveloper.close();
        this.modalSongwriter.close();
        Avatar.doAction('walk-to',{bottom: 110,left: 550*window.pageScale});
      }
    };

    var controller = new Controller();
    controller.init();
});
