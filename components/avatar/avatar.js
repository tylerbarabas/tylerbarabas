define(['lib/Ajax/ajax.js'], function (Ajax) {
    "use strict";

    function Avatar() {
    
	this.data = null;
	this.spritesheet = null;
	this.animation = null;
	this.stage = null;
	this.domContainer = null;
	this.parentContainer = null;

    }

    Avatar.prototype = {
	init: function() {

	    this.parentContainer = document.getElementById('sky');
	    this.domContainer = document.createElement('canvas');
	    this.parentContainer.appendChild(this.domContainer);

	    Ajax.get('components/avatar/json/tyler.json', function(data){
		console.log(data);
		this.data = JSON.parse(data);
		this.spritesheet = new createjs.SpriteSheet(data);
		this.animation = new createjs.Sprite(this.spritesheet, "idle");
		this.stage = new createjs.Stage(this.domContainer);

		this.stage.addChild(this.animation);

		createjs.Ticker.timingMode = create.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", this.stage);
	    }).bind(this);

//		this.data = JSON.parse(Tyler);
//		console.log(this.data);

	}
    };

    return Avatar;
});
