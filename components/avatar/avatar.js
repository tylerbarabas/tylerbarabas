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
			this.domContainer.id = 'avatar-container';
			this.parentContainer.appendChild(this.domContainer);

			Ajax.get('components/avatar/json/tyler.json', function(data){
				this.data = JSON.parse(data);
				this.spritesheet = new createjs.SpriteSheet(this.data);

				this.stage = new createjs.Stage(this.domContainer);

				this.domContainer.height = this.data.frames.height;
				this.domContainer.width = this.data.frames.width;

				this.changeSprite('idle');

				createjs.Ticker.timingMode = createjs.Ticker.RAF;
				createjs.Ticker.addEventListener("tick", this.stage);

				document.addEventListener('keydown', function(event) {
					switch(event.which) {
						case 37:
							this.walk('left');
							break;
						case 39:
							this.walk('right');
							break;
					}
				}.bind(this), false);

				document.addEventListener('keyup', function(event) {
					switch(event.which) {
						case 37:
						case 39:
							this.walk('idle');
							break;
					}
				}.bind(this), false);
			}.bind(this));
		},

		changeSprite: function (seq) {
			if (typeof seq != 'string') return;
			if (this.currentAnim == seq) return;

			if (this.stage != null) this.stage.removeChild(this.animation);

			this.currentAnim = seq;
			this.animation = new createjs.Sprite(this.spritesheet, this.currentAnim);

			this.stage.addChild(this.animation);
		},

		walk: function (direction) {
			switch(direction) {
				case 'right':
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('walk');
					break;
				case 'left':
					this.domContainer.style.transform = "rotateY(180deg)";
					this.changeSprite('walk');
					break;
				case 'idle':
				default:
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('idle');
					break;
			}
		}
    };

    return Avatar;
});
