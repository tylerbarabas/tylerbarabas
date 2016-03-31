define([], function () {
    "use strict";

    function World() {

        this.worlds = null;
        this.worldsObjects = {
            coder: {},
            singerSongwriter: {}
        };

        this.inTransition = false;

        this.init();
    }

    World.prototype = {

        init: function(){

            this.worlds = document.getElementsByClassName('world');
            this.avatarContainer = document.getElementById('avatar-container');
            this.worldsObjects.coder.skyScraper = document.getElementById('skyscraper');
            this.worldsObjects.singerSongwriter.campfire = document.getElementById('campfire');
            this.worldsObjects.singerSongwriter.hut = document.getElementById('hut');


            this.avatarContainer.addEventListener('doneWalking',function(event){
                if (event.side == 'left') {
                    this.changeWorld('coder');
                } else if (event.side == 'right') {
                    this.changeWorld('singer-songwriter');
                }
            }.bind(this));

        },

        changeWorld: function (world) {
            if (this.inTransition == true) return;

            var i = 0;
            if (world == 'all') {
                for(i=0;i<this.worlds.length;i++) {
                    this.worlds[i].className = 'world fadein';
                }
            } else {
                for(i=0;i<this.worlds.length;i++) {
                    if (this.worlds[i].id != world)
                        this.worlds[i].className = 'world fadeout';
                }
                this.worlds[world].className = 'world fadeIn';
            }

            setTimeout(function() {
                this.inTransition = false;
            }.bind(this), 2000);
        }
    };

    return World;
});
