define(['components/modal_developer/modal_developer','components/modal_songwriter/modal_songwriter.js'], function (ModalDeveloper,ModalSongwriter) {
    "use strict";

    function Environment() {
        this.sky = null;
        this.stars = null;
        this.moon = null;
        this.sun = null;
        this.cloud = null;
        this.ground = null;

        this.avatarContainer = null;

        this.inTransition = false;

        this.modalDeveloper = new ModalDeveloper();
        this.ModalSongwriter = new ModalSongwriter();

        this.init();
    }

    Environment.prototype = {

        init: function() {

            this.sky = document.getElementById('sky');
            this.stars = document.getElementById('stars');
            this.moon = document.getElementById('moon');
            this.sun = document.getElementById('sun');
            this.cloud = document.getElementById('cloud');
            this.ground = document.getElementById('ground');

            this.avatarContainer = document.getElementById('avatar-container');

            this.avatarContainer.addEventListener('doneWalking',function(event){
                if (event.side === 'left') {
                  this.changeState('day');
                  
                  this.modalDeveloper.close();
                  this.ModalSongwriter.open();
                    
                } else if (event.side === 'right') {
                  this.changeState('night');
                  
                  this.modalDeveloper.open();
                  this.ModalSongwriter.close();
                }
            }.bind(this));
        },

        changeState: function (state) {
            // if (this.inTransition === true) return;

            this.inTransition = true;
            this.sky.className = state;
            this.moon.className = state;
            this.sun.className = state;
            this.cloud.className = state;
            this.ground.className = state;
            this.stars.className = state;

            setTimeout(function() {
                this.inTransition = false;
            }.bind(this), 9000);
        }
    };

    return Environment;
});
