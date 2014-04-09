###
Smooth Scroll

@author     Naoki Sekiguchi
@copyright  2014 Naoki Sekiguchi
@url        http://likealunatic.jp/
@license    http://www.opensource.org/licenses/mit-license.html  MIT License
@require    jQuery.js, Underscore.js, Backbone.js
@version    Release: 1.1
@since      2012-12-20 12:06:50
###

$.SmoothScroll = Backbone.View.extend({
  el: 'a[href^="#"]'

  initialize: (options) ->
    # options
    @opt =
      complete: -> null

    _.extend(@opt, options)
    @detectScrollBody()
    this

  events:
    'click': 'scroll'

  detectScrollBody: ->
    $win = $(window)
    currentScrollTop = $win.scrollTop()
    $win.scrollTop(currentScrollTop + 1)
    if ($('html').scrollTop() > 0)
      @$body = $('html')
    else if ($('body').scrollTop() > 0)
      @$body = $('body')
    $win.scrollTop(currentScrollTop)
    this

  scroll: (e) ->
    target = e.currentTarget || e.originalEvent.currentTarget
    href = $(target).attr('href')
    return true if typeof href isnt 'string'
    href = href.replace(/(#[a-zA-Z0-9_\-]+)$/, '$1')
    if $(href)[0]?
      @$body.stop(true).animate({
        scrollTop: $(href).offset().top
      }, 750, 'swing', @opt.complete)
    e.preventDefault()
    this
})
