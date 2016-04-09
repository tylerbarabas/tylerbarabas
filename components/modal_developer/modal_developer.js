define(['components/avatar/avatar'], function (Avatar) {
    "use strict";

    function ModalDeveloper() {
      this.dom = document.getElementById('modal-developer');
    }

    ModalDeveloper.prototype = {
      open: function(){
        this.dom.className = 'modal developer show gpu-accelerate';
      },
      close: function() {
        this.dom.className = 'modal developer gpu-accelerate';
      }
    };

    if (typeof window.modalDeveloper === 'undefined') {
		    window.modalDeveloper = new ModalDeveloper();
	  }

	return window.modalDeveloper;
});
