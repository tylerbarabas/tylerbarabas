define(['lib/Ajax/ajax.js'], function (Ajax) {
    "use strict";

    function Avatar() {
    
		this.data = null;
		this.spritesheet = null;
		this.animation = null;
		this.stage = null;
		this.domContainer = null;
		this.parentContainer = null;
		this.currentPosition = null;
		this.currentDirection = null;
		this.walking = null;
		this.moving = null;

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
				this.domContainer.style.top = '65%';
				this.domContainer.style.left = '50%';

				this.currentPosition = {
					top: 65,
					left: 50
				};

				this.changeSprite('idle');
				this.walking = false;

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
					console.log('keyup!');
					switch(event.which) {
						case 37:
						case 39:
							console.log('here here');
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
			if (this.walking && direction != 'idle') return;
			var newPosition = {
				top: this.currentPosition.top,
				left: this.currentPosition.left
			};

			this.currentDirection = direction;

			switch(direction) {
				case 'right':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('walk');
					
					newPosition.left += 1;
					this.moveTo(newPosition);
					break;
				
				case 'left':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(180deg)";
					this.changeSprite('walk');

					newPosition.left -= 1;
					this.moveTo(newPosition);
					break;

				case 'idle':
				default:
				console.log('GOT HERE');
					this.walking = false;
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('idle');
					break;
			
			}
		},

		moveTo: function(toPos) {
			if (this.moving) return;

			this.moving = true;
			this.tween = createjs.Tween.get(this.currentPosition);
			this.tween.addEventListener('change', function () {
				this.domContainer.style.top = this.currentPosition.top + '%';
				this.domContainer.style.left = this.currentPosition.left + '%';
			}.bind(this));

			this.tween.to(toPos, 60).call(this.moveComplete, [], this);
		},

		moveComplete: function(){
			this.moving = false;
			if (this.walking) {
				this.walking = false;
				this.walk(this.currentDirection);
			}
		}
    };

    return Avatar;
});
