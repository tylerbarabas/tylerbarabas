define([], function () {
    "use strict";

    function Environment() {
        this.sky = document.getElementById('sky');
        this.stars = document.getElementById('stars');
        this.moon = document.getElementById('moon');
        this.sun = document.getElementById('sun');
        this.cloud = document.getElementById('cloud');
        this.ground = document.getElementById('ground');
    }

    Environment.prototype = {
        changeState: function (state) {
            this.sky.className = state;
            this.moon.className = state;
            this.sun.className = state;
            this.cloud.className = state;
            this.ground.className = state;
            this.stars.className = state;
        }
    };

    return Environment;
});