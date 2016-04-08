define([], function () {
    "use strict";

    function Environment() {
        this.sky = null;
        this.stars = null;
        this.moon = null;
        this.sun = null;
        this.cloud = null;
        this.ground = null;

        this.avatarContainer = null;

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
        },

        changeState: function (state) {
            this.inTransition = true;
            this.sky.className = state + " gpu-accelerate";
            this.moon.className = state + " gpu-accelerate";
            this.sun.className = state + " gpu-accelerate";
            this.cloud.className = state + " gpu-accelerate";
            this.ground.className = state + " gpu-accelerate";
            this.stars.className = state + " gpu-accelerate";
        }
    };

    if (typeof window.myEnvironment === 'undefined') {
		    window.myEnvironment = new Environment();
	  }

	return window.myEnvironment;
});
