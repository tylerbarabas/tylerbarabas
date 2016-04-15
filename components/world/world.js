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
            this.worldsObjects.coder.skyScraper = document.getElementById('skyscraper');
            this.worldsObjects.singerSongwriter.campfire = document.getElementById('campfire');
            this.worldsObjects.singerSongwriter.hut = document.getElementById('hut');

        },

        changeWorld: function (world) {
            var i = 0;
            if (world == 'all') {
                for(i=0;i<this.worlds.length;i++) {
                    this.worlds[i].className = 'world fadein gpu-accelerate';
                }
            } else {
                for(i=0;i<this.worlds.length;i++) {
                    if (this.worlds[i].id != world)
                        this.worlds[i].className = 'world fadeout gpu-accelerate';
                }
                this.worlds[world].className = 'world fadeIn gpu-accelerate';
            }
        }
    };

    if (typeof window.world === 'undefined') {
		    window.world = new World();
	  }

	return window.world;
});
