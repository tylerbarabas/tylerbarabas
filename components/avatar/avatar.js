define(['lib/Ajax/ajax','components/world/world','components/environment/environment', 'components/modal_developer/modal_developer', 'components/modal_songwriter/modal_songwriter'], function (Ajax,World,Environment,ModalDeveloper,ModalSongwriter) {
    "use strict";

    function Avatar() {

		this.data = null;
		this.spritesheet = null;
		this.animation = null;
		this.stage = null;
		this.domContainer = null;
		this.parentContainer = null;
		this.currentPosition = null;
		this.jumping = false;
		this.falling = false;

		this.init();
    }

    Avatar.prototype = {
		init: function() {

			this.parentContainer = document.getElementById('stage');
			this.domContainer = document.getElementById('avatar-container');
			this.parentContainer.appendChild(this.domContainer);

			Ajax.get('components/avatar/json/tyler.json', function(data){
        this.data = JSON.parse(data);
				this.spritesheet = new createjs.SpriteSheet(this.data);

				this.stage = new createjs.Stage(this.domContainer);

				this.domContainer.height = this.data.frames.height;
				this.domContainer.width = this.data.frames.width;
				this.domContainer.style.bottom = '110px';
				this.domContainer.style.left = this.parentContainer.offsetWidth/2 - (this.domContainer.offsetWidth / 2)+'px';

				this.currentPosition = {
					bottom: parseInt(this.domContainer.style.bottom.split('p')[0]),
					left: parseInt(this.domContainer.style.left.split('p')[0])*window.pageScale
				};

				this.changeSprite('idle');

				createjs.Ticker.timingMode = createjs.Ticker.RAF;
				createjs.Ticker.addEventListener("tick", this.stage);
			}.bind(this));
		},

		changeSprite: function (seq) {
			if (typeof seq != 'string') return;
			if (this.currentAnim == seq) return;

			if (this.stage !== null) this.stage.removeChild(this.animation);

			this.currentAnim = seq;
			this.animation = new createjs.Sprite(this.spritesheet, this.currentAnim);

			this.stage.addChild(this.animation);
		},

		doAction: function (action,newPosition) {

			if (typeof newPosition == 'undefined') newPosition = null;

			switch(action) {
				case 'walk-right':
					this.domContainer.style.transform = "rotateY(0deg)";
          this.domContainer.style.mozTransform = "rotateY(180deg)";
					this.changeSprite('walk');

					if (this.currentPosition.left > window.innerWidth+10) {
						this.currentPosition.left = -20;
						this.domContainer.style.left = this.currentPosition.left;
					}
					newPosition = {
						left: this.currentPosition.left
					};
					newPosition.left += 30;
					this.moveTo(newPosition,60,function(){
						if (window.keysDown.indexOf(39) !== -1)
							this.doAction('walk-right');
						else {
							this.doneWalking();
						}
					}.bind(this));

					break;

				case 'walk-left':
					this.domContainer.style.transform = "rotateY(180deg)";
          this.domContainer.style.mozTransform = "rotateY(180deg)";
					this.changeSprite('walk');

					if (this.currentPosition.left < -50) {
						this.currentPosition.left = window.innerWidth + 10;
						this.domContainer.style.left = this.currentPosition.left;
					}
					newPosition = {
						left: this.currentPosition.left
					};
					newPosition.left -= 30;
					this.moveTo(newPosition,60,function(){
						if (window.keysDown.indexOf(37) !== -1)
							this.doAction('walk-left');
						else {
							this.doneWalking();
						}
					}.bind(this));

					break;

				case 'jump':
					if (this.jumping || this.falling) return;
					this.jumping = true;
					newPosition = {
						bottom: this.currentPosition.bottom
					};
					newPosition.bottom = 350;
					this.moveTo(newPosition,300,function(){
						this.jumping = false;
						this.doAction('fall');
					});
					break;

				case 'fall':
					this.falling = true;
					newPosition = {
						bottom: this.currentPosition.bottom
					};
					newPosition.bottom = 110;
					this.moveTo(newPosition,300,function(){
						this.falling = false;
						if (window.keysDown.indexOf(38) !== -1) this.doAction('jump');
					});
					break;

				case 'walk-to':
					if (this.currentPosition.left > newPosition.left) {
						this.domContainer.style.transform = "rotateY(180deg)";
            this.domContainer.style.mozTransform = "rotateY(180deg)";

					} else {
						this.domContainer.style.transform = "rotateY(0deg)";
            this.domContainer.style.mozTransform = "rotateY(0deg)";
					}
					var ratePerSec = 500;
					var distance = this.currentPosition.left - newPosition.left;
					distance = (distance<0)?distance*-1:distance;
					var time = distance/(ratePerSec/1000);

					this.changeSprite('walk');
					this.moveTo(newPosition,time,function(){
						this.doneWalking();
					});
					break;

				case 'guitar':
					this.domContainer.style.transform = "rotateY(0deg)";
          this.domContainer.style.mozTransform = "rotateY(0deg)";
					this.changeSprite('guitar');
					break;

				case 'idle':
				default:
					this.walking = false;
					this.domContainer.style.transform = "rotateY(0deg)";
          this.domContainer.style.mozTransform = "rotateY(0deg)";
					this.changeSprite('idle');
					break;
			}
		},

		moveTo: function(toPos,time,callback) {

			if (typeof callback === 'undefined') callback = function(){};

			this.moving = true;
			this.tween = createjs.Tween.get(this.currentPosition);
			this.tween.addEventListener('change', function () {
				if (typeof toPos.bottom !== 'undefined') {
					this.domContainer.style.bottom = this.currentPosition.bottom + 'px';
				}
				if (typeof toPos.left !== 'undefined') {
					this.domContainer.style.left = this.currentPosition.left / window.pageScale + 'px';
				}
			}.bind(this));

			this.tween.to(toPos, time).call(callback, [], this);
		},

		doneWalking: function() {
			var view = document.body.getBoundingClientRect(),
          coder = document.getElementById('title-coder'),
          songwriter = document.getElementById('title-songwriter');

			if ((this.currentPosition.left/window.pageScale) < 447) {
				this.doAction('idle');
        World.changeWorld('coder');
        Environment.changeState('day');
        coder.className = 'title coder gpu-accelerate active';
        songwriter.className = 'title songwriter gpu-accelerate';
        ModalDeveloper.open();
        ModalSongwriter.close();
			} else if ((this.currentPosition.left/window.pageScale) > 650) {
				this.doAction('guitar');
        World.changeWorld('singer-songwriter');
        Environment.changeState('night');
        coder.className = 'title coder gpu-accelerate';
        songwriter.className = 'title songwriter gpu-accelerate active';
        ModalDeveloper.close();
        ModalSongwriter.open();
			} else {
        this.doAction('idle');
        World.changeWorld('all');
        coder.className = 'title coder gpu-accelerate';
        songwriter.className = 'title songwriter gpu-accelerate';
        ModalDeveloper.close();
        ModalSongwriter.close();
      }
		}

    };

    if (typeof window.avatar === 'undefined') {
		    window.avatar = new Avatar();
	  }

	return window.avatar;
});
