define(['components/avatar/avatar'], function (Avatar) {
    "use strict";

    function ModalSongwriter() {
      this.dom = document.getElementById('modal-songwriter');
    }

    ModalSongwriter.prototype = {
      open: function(){
        this.dom.className = 'modal songwriter show';
      },
      close: function() {
        this.dom.className = 'modal songwriter';
      }
    };

    if (typeof window.modalSongwriter === 'undefined') {
		    window.modalSongwriter = new ModalSongwriter();
	  }

	return window.modalSongwriter;
});
