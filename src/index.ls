flexize = (opt = {}) ->
  @_ = opt: opt, selector: opt.gutter-selector or '.flexize-gutter'
  @root = opt.root
  @build!
  @estimate!
  visible-sibling = (n, d) ~>
    d = if d < 0 => \previousSibling else \nextSibling
    while (
      (n = n[d]) and
      (
        getComputedStyle(n).display == \none or
        @_.gutter-set.has(n) or
        n.classList.contains('flexize-fixed')
      )
    ) => continue
    return n

  @_.gutters.for-each (g) ~>
    g.addEventListener \mousedown, (evt) ~>
      @estimate!
      attr = @attr!
      [pn, nn] = [g.previousSibling, g.nextSibling]
      pn = visible-sibling g, -1
      nn = visible-sibling g, 1
      console.log pn, nn
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
    delta = if @dir! == \row => (evt.clientX - drag.ptr.x) else (evt.clientY - drag.ptr.y)
    [n1, n2] = if delta < 0 => [drag.p, drag.n] else [drag.n, drag.p]
    [s1, s2] = if delta < 0 => [drag.s.p, drag.s.n] else [drag.s.n, drag.s.p]
    [g1, g2] = if delta < 0 => [drag.f.p, drag.f.n] else [drag.f.n, drag.f.p]
    percent = -Math.abs(delta / @_.free-space) * @_.total-grow #(g1 + g2)
    ng1 = (g1 + percent) >? 0
    ng2 = g2 + (g1 - ng1)
    n1.style.flexGrow = ng1
    n2.style.flexGrow = ng2

  @

flexize.prototype = Object.create(Object.prototype) <<<
  init: ->
  dir: ->
    if @_.dir => return that
    s = getComputedStyle @root
    @_.dir = if (s.flexDirection or 'row') in <[row row-reverse]> => \row else \column
  attr: -> if @dir! == \row => \width else \height
  estimate: ->
    attr = @attr!
    nodes = Array.from(@root.childNodes)
    gs = nodes.map (n) -> +getComputedStyle(n).flexGrow
    sum = gs.reduce(((a,b) -> a + b), 0)
    nodes.map (n) -> n.style.flexGrow = 0
    size = @root.getBoundingClientRect![attr]
    nsize = nodes.map (n) -> n.getBoundingClientRect![attr]
    space = size - nsize.reduce(((a,b) -> a + b), 0)
    nodes.map (n,i) -> n.style.flexGrow = gs[i]
    @_.free-space = space
    @_.total-grow = sum
  build: ->
    @_.gutters = Array.from(@root.querySelectorAll @_.selector)
    @_.gutter-set = new Set(@_.gutters)
    set = new Set!
    @_.gutters.map (g) ~>
      (n) <~ [g.previousSibling, g.nextSibling].map _
      if set.has(n) => return else set.add n
    @_.panes = Array.from(set)
  set: (v = []) ->
    @_.panes.map (n,i) -> n.style.flexGrow = v[i] or 0
    @estimate!

if window? => window.flexize = flexize else module.exports = flexize
