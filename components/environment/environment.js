define([], function () {
    "use strict";

    function Environment() {
        this.sky = document.getElementById('sky');
        this.stars = document.getElementById('stars');
        this.moon = document.getElementById('moon');
        this.sun = document.getElementById('sun');
        this.cloud = document.getElementById('cloud');
        this.ground = document.getElementById('ground');
        this.inTransition = false;
    }

    Environment.prototype = {

        changeState: function (state) {
            if (this.inTransition == true) return;

            this.inTransition = true;
            this.sky.className = state;
            this.moon.className = state;
            this.sun.className = state;
            this.cloud.className = state;
            this.ground.className = state;
            this.stars.className = state;

            setTimeout(function() {
                this.inTransition = false;
            }.bind(this), 9000)
        }
    };

    return Environment;
});