define([], function () {
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

    return ModalSongwriter;
});
