/**
 * Smooth Scroll
 *
 * @author     Naoki Sekiguchi
 * @copyright  2012 Naoki Sekiguchi
 * @url        http://likealunatic.jp/
 * @url        http://ranagram.com/
 * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
 * @require    jQuery.js, Underscore.js, Backbone.js
 * @version    Release: 1.0
 * @since      2012-12-20 12:06:50
 */

;(function($, _, window, document, undefined) {

/**
 * smooth scroll
 */
$.SmoothScroll = Backbone.View.extend({
	el: 'a[href^="#"]',
	initialize: function (options) {
		// options
		this.opt = {
			complete: function () { }
		};
		_.extend(this.opt, options);
		this.detectScrollBody();
	},
	events: {
		'click': 'scroll'
	},
	detectScrollBody: function () {
		var $win = $(window);
		var currentScrollTop = $win.scrollTop();
		$win.scrollTop(currentScrollTop + 1);
		if ($('html').scrollTop() > 0) {
			this.$body = $('html');
		} else if ($('body').scrollTop() > 0) {
			this.$body = $('body');
		}
		$win.scrollTop(currentScrollTop);
	},
	scroll: function (e) {
		var target = e.currentTarget || e.originalEvent.currentTarget;
		var href = $(target).attr('href');
		if (typeof href != 'string') { return true; }
		href = href.replace(/(#[a-zA-Z0-9_\-]+)$/, '$1');
		if (!$(href)[0]) { return true; }
		this.$body.stop(true).animate({
			scrollTop: $(href).offset().top
		}, 750, 'swing', this.opt.complete);
		e.preventDefault();
	}
});

})(jQuery, _, this, this.document);
