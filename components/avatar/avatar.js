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
				this.jumping = false;
				this.falling = false;

				createjs.Ticker.timingMode = createjs.Ticker.RAF;
				createjs.Ticker.addEventListener("tick", this.stage);

				document.addEventListener('keydown', this.onKeyDown.bind(this), false);
				document.addEventListener('keyup', this.onKeyUp.bind(this), false);
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

		doAction: function (action) {
			if ((this.walking || this.jumping || this.falling) && action != 'idle') return;
			var newPosition = {
				top: this.currentPosition.top,
				left: this.currentPosition.left
			};

			this.currentAction = action;

			switch(action) {
				case 'walk-right':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(0deg)";
					this.changeSprite('walk');
					
					newPosition.left += 1;
					this.moveTo(newPosition,60);
					break;
				
				case 'walk-left':
					this.walking = true;
					this.domContainer.style.transform = "rotateY(180deg)";
					this.changeSprite('walk');

					newPosition.left -= 1;
					this.moveTo(newPosition,60);
					break;

				case 'jump':
					this.jumping = true;
					newPosition.top = 45;
					this.moveTo(newPosition,300);
					break;

				case 'fall':
					this.falling = true;
					newPosition.top = 65;
					this.moveTo(newPosition,300);
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
				this.domContainer.style.top = this.currentPosition.top + '%';
				this.domContainer.style.left = this.currentPosition.left + '%';
			}.bind(this));

			this.tween.to(toPos, time).call(this.moveComplete, [], this);
		},

		moveComplete: function(){
			this.moving = false;
			if (this.currentAction.indexOf('walk') != -1 && this.walking) {
				this.walking = false;
				this.doAction(this.currentAction);
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
