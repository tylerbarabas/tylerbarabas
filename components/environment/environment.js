define([], function () {
    "use strict";

    function Environment() {
        this.sky = document.getElementById('sky');
        this.sun = document.getElementById('sun');
        this.cloud = document.getElementById('cloud');
        this.ground = document.getElementById('ground');
    }

    Environment.prototype = {
        changeState: function (state) {
            this.sky.className = state;
            this.sun.className = state;
            this.cloud.className = state;
            this.ground.className = state;
        }
    };

    return Environment;
});