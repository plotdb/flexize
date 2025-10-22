(function(){
  var flexize, ref$;
  flexize = function(opt){
    opt == null && (opt = {});
    this._ = {
      gutterInited: new WeakMap(),
      opt: opt,
      root: typeof opt.root === 'string'
        ? document.body.querySelector(opt.root)
        : opt.root,
      selector: {
        gutter: opt.gutterSelector || '& > .flexize-gutter, & > div > .flexize-gutter',
        fixed: opt.fixedSelector || '& > .flexize-fixed'
      }
    };
    this.build();
    this.estimate();
    return this;
  };
  flexize.prototype = (ref$ = Object.create(Object.prototype), ref$.dir = function(){
    var that, s, ref$;
    if (that = this._.dir) {
      return that;
    }
    s = getComputedStyle(this._.root);
    this._.cssdir = s.flexDirection;
    return this._.dir = (ref$ = this._.cssdir || 'row') === 'row' || ref$ === 'row-reverse' ? 'row' : 'column';
  }, ref$.attr = function(){
    if (this.dir() === 'row') {
      return 'width';
    } else {
      return 'height';
    }
  }, ref$.reverse = function(){
    this.dir();
    return !!/reverse/.exec(this._.cssdir || '');
  }, ref$.estimate = function(){
    var attr, nodes, gs, sum, size, nsize, space;
    attr = this.attr();
    nodes = Array.from(this._.root.childNodes).filter(function(n){
      return n instanceof Element;
    });
    gs = nodes.map(function(n){
      return +getComputedStyle(n).flexGrow;
    });
    sum = gs.reduce(function(a, b){
      return a + b;
    }, 0);
    nodes.map(function(n){
      return n.style.flexGrow = 0;
    });
    size = this._.root.getBoundingClientRect()[attr];
    nsize = nodes.map(function(n){
      return n.getBoundingClientRect()[attr];
    });
    space = size - nsize.reduce(function(a, b){
      return a + b;
    }, 0);
    nodes.map(function(n, i){
      return n.style.flexGrow = gs[i];
    });
    this._.freeSpace = space;
    this._.totalGrow = sum;
    return this._.initialGrow = gs;
  }, ref$.build = function(){
    var set, this$ = this;
    this._.gutters = Array.from(this._.root.querySelectorAll(this._.selector.gutter));
    this._.gutterSet = new Set(this._.gutters);
    set = new Set();
    this._.gutters.map(function(g){
      return this$._getSibling(g).map(function(n){
        if (set.has(n)) {} else {
          return set.add(n);
        }
      });
    });
    this._.panes = Array.from(set);
    return this._.gutters.forEach(function(g){
      if (this$._.gutterInited.get(g)) {
        return;
      }
      this$._.gutterInited.set(g, true);
      return g.addEventListener('mousedown', function(evt){
        var attr, pn, nn;
        this$.estimate();
        attr = this$.attr();
        pn = this$._visibleSibling(g, -1);
        nn = this$._visibleSibling(g, 1);
        if (!(pn && nn)) {
          return;
        }
        this$._.drag = {
          ptr: {
            x: evt.clientX,
            y: evt.clientY
          },
          g: g,
          p: pn,
          n: nn,
          s: {
            p: pn.getBoundingClientRect()[attr],
            n: nn.getBoundingClientRect()[attr]
          },
          f: {
            p: +getComputedStyle(pn).flexGrow,
            n: +getComputedStyle(nn).flexGrow
          }
        };
        return window.addEventListener('mousemove', this$._.moveHandler = function(evt){
          return this$._moveHandler(evt);
        });
      });
    });
  }, ref$._moveHandler = function(evt){
    var drag, attr, reverse, delta, ref$, n1, n2, s1, s2, g1, g2, percent, ng1, ng2;
    if (!((drag = this._.drag) && evt.buttons & 1)) {
      this._.drag = null;
      window.removeEventListener('mousemove', this._.moveHandler);
      return;
    }
    attr = this.attr();
    reverse = this.reverse();
    delta = this.dir() === 'row'
      ? evt.clientX - drag.ptr.x
      : evt.clientY - drag.ptr.y;
    ref$ = delta < 0
      ? [drag.p, drag.n]
      : [drag.n, drag.p], n1 = ref$[0], n2 = ref$[1];
    ref$ = delta < 0
      ? [drag.s.p, drag.s.n]
      : [drag.s.n, drag.s.p], s1 = ref$[0], s2 = ref$[1];
    ref$ = delta < 0
      ? [drag.f.p, drag.f.n]
      : [drag.f.n, drag.f.p], g1 = ref$[0], g2 = ref$[1];
    if (reverse) {
      ref$ = [n2, n1, s2, s1, g2, g1], n1 = ref$[0], n2 = ref$[1], s1 = ref$[2], s2 = ref$[3], g1 = ref$[4], g2 = ref$[5];
    }
    percent = -Math.abs(delta / this._.freeSpace) * this._.totalGrow;
    ng1 = (ref$ = g1 + percent) > 0 ? ref$ : 0;
    ng2 = g2 + (g1 - ng1);
    n1.style.flexGrow = ng1;
    return n2.style.flexGrow = ng2;
  }, ref$.set = function(v){
    v == null && (v = []);
    this._.panes.map(function(n, i){
      return n.style.flexGrow = v[i] || 0;
    });
    return this.estimate();
  }, ref$.reset = function(){
    var this$ = this;
    Array.from(this._.root.childNodes).filter(function(n){
      return n instanceof Element;
    }).map(function(n, i){
      return n.style.flexGrow = this$._.initialGrow[i];
    });
    this.build();
    return this.estimate();
  }, ref$._getSibling = function(g){
    var n;
    n = g;
    while (n.parentNode !== this._.root) {
      n = n.parentNode;
    }
    return g !== n
      ? [n, n.nextSibling]
      : [n.previousSibling, n.nextSibling];
  }, ref$._visibleSibling = function(n, d){
    d = d < 0 ? 'previousSibling' : 'nextSibling';
    n = Object.fromEntries(this._getSibling(n).map(function(d, i){
      return [['previousSibling', 'nextSibling'][i], d];
    }));
    while ((n = n[d]) && (!(n instanceof Element) || getComputedStyle(n).display === 'none' || this._.gutterSet.has(n) || n.matches(this._.selector.fixed))) {}
    return n;
  }, ref$);
  if (typeof window != 'undefined' && window !== null) {
    window.flexize = flexize;
  } else {
    module.exports = flexize;
  }
}).call(this);
