define([], function () {
    "use strict";

    function ModalDeveloper() {
      this.dom = document.getElementById('modal-developer');
    }

    ModalDeveloper.prototype = {
      open: function(){
        this.dom.className = 'modal developer show';
      },
      close: function() {
        this.dom.className = 'modal developer';
      }
    };

    return ModalDeveloper;
});
