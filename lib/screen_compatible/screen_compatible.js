/**
 * Screen compatible
 *
 * @author Tyler Barabas <tylerbarabas@gmail.com>
 */
define(function () {

    return {

        init: function() {
          window.pageScale =  1;
          this.dom = document.getElementById('stage');
          this.resize();
          this.dom.style.visibility = 'visible';
          window.addEventListener('resize',this.resize.bind(this));
        },
        resize: function() {
          var div_w = this.dom.clientWidth, div_h = this.dom.clientHeight;

          var scale_w = window.innerWidth / div_w;
          var scale_h = window.innerHeight / div_h;

          window.pageScale = Math.min(scale_w, scale_h) * 0.98;
          document.body.style.webkitTransform = 'scale(' + window.pageScale + ')';
          document.body.style.msTransform = 'scale(' + window.pageScale + ')';
          document.body.style.transform = 'scale(' + window.pageScale + ')';

          var move_x = ( window.innerWidth - this.dom.clientWidth * window.pageScale) / 2;
          var move_y = ( window.innerHeight - this.dom.clientHeight * window.pageScale) / 2;

          var compensateLeft = ( window.innerWidth - this.dom.clientWidth * window.pageScale) / 8;

          move_x = (move_x / window.pageScale);
          move_y = (move_y / window.pageScale) - 7;

          this.dom.style.top = move_y + 'px';
          this.dom.style.left = move_x + 'px';
        }
    };
});
