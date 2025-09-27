flexize = (opt = {}) ->
  @_ =
    opt: opt
    root: if typeof(opt.root) == \string => document.body.querySelector(opt.root) else opt.root
    selector:
      gutter: opt.gutter-selector or '.flexize-gutter'
      fixed: opt.fixed-selector or '.flexize-fixed'

  @build!
  @estimate!

  @_.gutters.for-each (g) ~>
    g.addEventListener \mousedown, (evt) ~>
      @estimate!
      attr = @attr!
      [pn, nn] = [g.previousSibling, g.nextSibling]
      pn = @_visible-sibling g, -1
      nn = @_visible-sibling g, 1
      if !(pn and nn) => return
      @_.drag =
        ptr: {x: evt.clientX, y: evt.clientY}
        g: g
        p: pn
        n: nn
        s: p: pn.getBoundingClientRect![attr], n: nn.getBoundingClientRect![attr]
        f: p: +getComputedStyle(pn).flexGrow,  n: +getComputedStyle(nn).flexGrow

  window.addEventListener \mousemove, (evt) ~>
    if !((drag = @_.drag) and (evt.buttons .&. 1)) => return @_.drag = null
    attr = @attr!
    reverse = @reverse!
    delta = if @dir! == \row => (evt.clientX - drag.ptr.x) else (evt.clientY - drag.ptr.y)
    [n1, n2] = if delta < 0 => [drag.p, drag.n] else [drag.n, drag.p]
    [s1, s2] = if delta < 0 => [drag.s.p, drag.s.n] else [drag.s.n, drag.s.p]
    [g1, g2] = if delta < 0 => [drag.f.p, drag.f.n] else [drag.f.n, drag.f.p]
    if reverse => [n1, n2, s1, s2, g1, g2] = [n2, n1, s2, s1, g2, g1]
    percent = -Math.abs(delta / @_.free-space) * @_.total-grow #(g1 + g2)
    ng1 = (g1 + percent) >? 0
    ng2 = g2 + (g1 - ng1)
    n1.style.flexGrow = ng1
    n2.style.flexGrow = ng2

  @

flexize.prototype = Object.create(Object.prototype) <<<
  dir: ->
    if @_.dir => return that
    s = getComputedStyle @_.root
    @_.cssdir = s.flexDirection
    @_.dir = if (@_.cssdir or 'row') in <[row row-reverse]> => \row else \column
  attr: -> if @dir! == \row => \width else \height
  reverse: -> @dir!; return !!/reverse/.exec(@_.cssdir or '')
  estimate: ->
    attr = @attr!
    nodes = Array.from(@_.root.childNodes)
    gs = nodes.map (n) -> +getComputedStyle(n).flexGrow
    sum = gs.reduce(((a,b) -> a + b), 0)
    nodes.map (n) -> n.style.flexGrow = 0
    size = @_.root.getBoundingClientRect![attr]
    nsize = nodes.map (n) -> n.getBoundingClientRect![attr]
    space = size - nsize.reduce(((a,b) -> a + b), 0)
    nodes.map (n,i) -> n.style.flexGrow = gs[i]
    @_.free-space = space
    @_.total-grow = sum
    @_.intial-grow = gs
  build: ->
    @_.gutters = Array.from(@_.root.querySelectorAll @_.selector.gutter)
    @_.gutter-set = new Set(@_.gutters)
    set = new Set!
    @_.gutters.map (g) ~>
      (n) <~ [g.previousSibling, g.nextSibling].map _
      if set.has(n) => return else set.add n
    @_.panes = Array.from(set)
  set: (v = []) ->
    @_.panes.map (n,i) -> n.style.flexGrow = v[i] or 0
    @estimate!
  reset: ->
    Array.from(@_.root.childNodes).map (n,i) ~> n.style.flexGrow = @_.initial-grow[i]
    @build!
    @estimate!
  _visible-sibling: (n, d) ->
    d = if d < 0 => \previousSibling else \nextSibling
    while (
      (n = n[d]) and
      (
        getComputedStyle(n).display == \none or
        @_.gutter-set.has(n) or
        n.matches @_.selector.fixed
      )
    ) => continue
    return n

if window? => window.flexize = flexize else module.exports = flexize
