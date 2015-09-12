define([], function () {
    "use strict";

    function World() {

        this.worlds = document.getElementsByClassName('world');

        this.worldsObjects = {
            coder: {},
            singerSongwriter: {}
        };

        this.worldsObjects.coder.skyScraper = document.getElementById('skyscraper');

        this.worldsObjects.singerSongwriter.campfire = document.getElementById('campfire');
        this.worldsObjects.singerSongwriter.hut = document.getElementById('hut');

        this.inTransition = false;
    }

    World.prototype = {

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