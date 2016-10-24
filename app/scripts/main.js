function aload(t){"use strict";var e="data-aload";return t=t||window.document.querySelectorAll("["+e+"]"),void 0===t.length&&(t=[t]),[].forEach.call(t,function(t){t["LINK"!==t.tagName?"src":"href"]=t.getAttribute(e),t.removeAttribute(e)}),t}



/**
 * Created by Sallar Kaboli <sallar.kaboli@gmail.com>
 * @sallar
 *
 * Released under the MIT License.
 * http://sallar.mit-license.org/
 *
 * This document demonstrates three things:
 *
 * - Creating a simple parallax effect on the content
 * - Creating a Medium.com-style blur on scroll image
 * - Getting scroll position using requestAnimationFrame for better performance
 */


/**
 * Cache
 */
var $container = $('header .container')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

/**
 * requestAnimationFrame Shim
 */
window.requestAnimFrame = (function()
{
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

let loadImages=()=>{
    for(let x=1;x<=46;x++){
        let imgTag = $('<img />', {'src' : '/images/thumbnails/Image' + x +'.jpg'})
        let a = $('<a>', {'href' : '/images/gallery/Image' + x +'.jpg','data-lightbox':'gallery'}).append(imgTag).append($('</a>'))
        var img = $('<div>', {class:'grid-item'}).append(a).append($('</div>'))
        // .append($('</a>'))'data-lightbox':'gallery'
        img.appendTo('.gallery');
    }
}

/**
 * Scroller
 */
function Scroller()
{
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
  /**
   * Initialize
   */
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  },

  /**
   * Capture Scroll
   */
  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },

  /**
   * Request a Tick
   */
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },

  /**
   * Update.
   */
  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;

    /**
     * Do The Dirty Work Here
     */
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 3;

    // $container.css({
    //   'transform'         : 'translateY(-' + slowScroll + 'px)',
    //   '-moz-transform'    : 'translateY(-' + slowScroll + 'px)',
    //   '-webkit-transform' : 'translateY(-' + slowScroll + 'px)'
    // });

    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};

/**
 * Attach!
 */
var scroller = new Scroller();
scroller.init();
window.onload = function(){
    loadImages();
    aload();
};
