function Environment() {

    this.sky = document.getElementById('sky');
    this.sun = document.getElementById('sun');
    this.cloud = document.getElementById('cloud');
    this.ground = document.getElementById('ground');
    this.hut = document.getElementById('hut');

}

Environment.prototype = {
    changeState: function (state) {
        this.sky.className = state;
        this.sun.className = state;
        this.cloud.className = state;
        this.ground.className = state;
    }
};

setTimeout (function() {
    var env = new Environment();
    env.changeState('night');
}, 10000);