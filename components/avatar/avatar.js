define(['json!components/avatar/json/tyler'], function (tyler) {
    "use strict";

    function Avatar() {
    
	this.data = null;
	this.spritesheet = null;
	this.animation = null;

    }

    Avatar.prototype = {
	init: function() {

//		this.data = JSON.parse(Tyler);
//		console.log(this.data);

	}
    };

    return Avatar;
});
