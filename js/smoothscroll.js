
/*
Smooth Scroll

@author     Naoki Sekiguchi
@copyright  2014 Naoki Sekiguchi
@url        http://likealunatic.jp/
@license    http://www.opensource.org/licenses/mit-license.html  MIT License
@require    jQuery.js, Underscore.js, Backbone.js
@version    Release: 1.1
@since      2012-12-20 12:06:50
 */

(function() {
  $.SmoothScroll = Backbone.View.extend({
    el: 'a[href^="#"]',
    initialize: function(options) {
      this.opt = {
        complete: function() {
          return null;
        }
      };
      _.extend(this.opt, options);
      this.detectScrollBody();
      return this;
    },
    events: {
      'click': 'scroll'
    },
    detectScrollBody: function() {
      var $win, currentScrollTop;
      $win = $(window);
      currentScrollTop = $win.scrollTop();
      $win.scrollTop(currentScrollTop + 1);
      if ($('html').scrollTop() > 0) {
        this.$body = $('html');
      } else if ($('body').scrollTop() > 0) {
        this.$body = $('body');
      }
      $win.scrollTop(currentScrollTop);
      return this;
    },
    scroll: function(e) {
      var href, target;
      target = e.currentTarget || e.originalEvent.currentTarget;
      href = $(target).attr('href');
      if (typeof href !== 'string') {
        return true;
      }
      href = href.replace(/(#[a-zA-Z0-9_\-]+)$/, '$1');
      if ($(href)[0] != null) {
        this.$body.stop(true).animate({
          scrollTop: $(href).offset().top
        }, 750, 'swing', this.opt.complete);
      }
      e.preventDefault();
      return this;
    }
  });

}).call(this);
