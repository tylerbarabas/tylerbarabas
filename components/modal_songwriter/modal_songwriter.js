define(['components/avatar/avatar'], function (Avatar) {
    "use strict";

    function ModalSongwriter() {
      this.dom = document.getElementById('modal-songwriter');
    }

    ModalSongwriter.prototype = {
      open: function(){
        this.dom.className = 'modal songwriter show gpu-accelerate';
      },
      close: function() {
        this.dom.className = 'modal songwriter gpu-accelerate';
      }
    };

    if (typeof window.modalSongwriter === 'undefined') {
		    window.modalSongwriter = new ModalSongwriter();
	  }

	return window.modalSongwriter;
});
