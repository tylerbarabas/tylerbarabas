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
		this.currentAction = null;
		this.walking = false;
		this.jumping = false;
		this.falling = false;
		this.moving = false;
		this.keysDown = [];

		this.init();
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
				this.domContainer.style.bottom = '150px';
				this.domContainer.style.left = window.innerHeight/2+'px';

				this.currentPosition = {
					bottom: 150,
					left: parseInt(this.domContainer.style.left.split('p')[0])
				};

				this.changeSprite('guitar');
				this.walking = false;
				this.jumping = false;
				this.falling = false;

				createjs.Ticker.timingMode = createjs.Ticker.RAF;
				createjs.Ticker.addEventListener("tick", this.stage);
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

		doAction: function (action,newPosition) {
			if ((this.walking || this.jumping || this.falling) && action != 'idle') return;
			this.currentAction = action;

			if (typeof newPosition == 'undefined') newPosition = null;

			switch(action) {
				case 'walk-right':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('walk');

					if (this.currentPosition.left > window.innerWidth+10) {
						this.currentPosition.left = -50;
						this.domContainer.style.left = this.currentPosition.left;
					}
					newPosition = {
						bottom: this.currentPosition.bottom,
						left: this.currentPosition.left
					};
					newPosition.left += 10;
					this.moveTo(newPosition,60);

					break;
				
				case 'walk-left':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(180deg)";
					this.changeSprite('walk');

					if (this.currentPosition.left < -50) {
						this.currentPosition.left = window.innerWidth + 10;
						this.domContainer.style.left = this.currentPosition.left;
					}
					newPosition = {
						bottom: this.currentPosition.bottom,
						left: this.currentPosition.left
					};
					newPosition.left -= 10;
					this.moveTo(newPosition,60);

					break;

				case 'jump':
					this.jumping = true;
					newPosition = {
						bottom: this.currentPosition.bottom,
						left: this.currentPosition.left
					};
					newPosition.bottom = 350;
					this.moveTo(newPosition,300);
					break;

				case 'fall':
					this.falling = true;
					newPosition = {
						bottom: this.currentPosition.bottom,
						left: this.currentPosition.left
					};
					newPosition.bottom = 150;
					this.moveTo(newPosition,300);
					break;

				case 'walk-to':
					this.walking = true;
					if (this.currentPosition.left > newPosition.left) {
						this.domContainer.style.transform = "rotateY(180deg)";
					} else {
						this.domContainer.style.transform = "rotateY(0deg)";
					}
					var ratePerSec = 250;
					var distance = this.currentPosition.left - newPosition.left;
					distance = (distance<0)?distance*-1:distance;
					var time = distance/(ratePerSec/1000);

					this.changeSprite('walk');
					this.moveTo(newPosition,time);
					break;

				case 'guitar':
					this.changeSprite('guitar');
					break;

				case 'idle':
				default:
					this.walking = false;
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('idle');
					break;
			}
		},

		moveTo: function(toPos,time) {
			if (this.moving) return;

			this.moving = true;
			this.tween = createjs.Tween.get(this.currentPosition);
			this.tween.addEventListener('change', function () {
				this.domContainer.style.bottom = this.currentPosition.bottom + 'px';
				this.domContainer.style.left = this.currentPosition.left + 'px';
			}.bind(this));

			this.tween.to(toPos, time).call(this.moveComplete, [], this);
		},

		moveComplete: function(){
			this.moving = false;
			if ((this.currentAction == 'walk-right' || this.currentAction == 'walk-left') && this.walking) {
				this.walking = false;
				this.doAction(this.currentAction);
			} else if (this.currentAction == 'walk-to') {
				this.walking = false;
				this.doAction('idle');
			} else if (this.currentAction == 'jump') {
				this.jumping = false;
				this.doAction('fall');
			} else if (this.currentAction == 'fall') {
				this.falling = false;
				if (this.keysDown.indexOf(38) != -1) this.doAction('jump');
			}
		}
    };

    return Avatar;
});