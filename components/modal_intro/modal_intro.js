define(['components/avatar/avatar'], function (Avatar) {
    "use strict";

    function ModalIntro() {
      this.dom = document.getElementById('modal-intro');
    }

    ModalIntro.prototype = {
      open: function(){
        this.dom.className = 'modal intro show gpu-accelerate';
      },
      close: function() {
        this.dom.className = 'modal intro gpu-accelerate';
      }
    };

    if (typeof window.modalIntro === 'undefined') {
		    window.modalIntro = new ModalIntro();
	  }

	return window.modalIntro;
});
