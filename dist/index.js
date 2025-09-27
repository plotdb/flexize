(function(){
  var flexize, ref$;
  flexize = function(opt){
    var visibleSibling, this$ = this;
    opt == null && (opt = {});
    this._ = {
      opt: opt,
      selector: opt.gutterSelector || '.flexize-gutter'
    };
    this.root = opt.root;
    this.build();
    this.estimate();
    visibleSibling = function(n, d){
      d = d < 0 ? 'previousSibling' : 'nextSibling';
      while ((n = n[d]) && (getComputedStyle(n).display === 'none' || this$._.gutterSet.has(n) || n.classList.contains('flexize-fixed'))) {}
      return n;
    };
    this._.gutters.forEach(function(g){
      return g.addEventListener('mousedown', function(evt){
        var attr, ref$, pn, nn;
        this$.estimate();
        attr = this$.attr();
        ref$ = [g.previousSibling, g.nextSibling], pn = ref$[0], nn = ref$[1];
        pn = visibleSibling(g, -1);
        nn = visibleSibling(g, 1);
        console.log(pn, nn);
        if (!(pn && nn)) {
          return;
        }
        return this$._.drag = {
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
      });
    });
    window.addEventListener('mousemove', function(evt){
      var drag, attr, delta, ref$, n1, n2, s1, s2, g1, g2, percent, ng1, ng2;
      if (!((drag = this$._.drag) && evt.buttons & 1)) {
        return this$._.drag = null;
      }
      attr = this$.attr();
      delta = this$.dir() === 'row'
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
      percent = -Math.abs(delta / this$._.freeSpace) * this$._.totalGrow;
      ng1 = (ref$ = g1 + percent) > 0 ? ref$ : 0;
      ng2 = g2 + (g1 - ng1);
      n1.style.flexGrow = ng1;
      return n2.style.flexGrow = ng2;
    });
    return this;
  };
  flexize.prototype = (ref$ = Object.create(Object.prototype), ref$.init = function(){}, ref$.dir = function(){
    var that, s, ref$;
    if (that = this._.dir) {
      return that;
    }
    s = getComputedStyle(this.root);
    return this._.dir = (ref$ = s.flexDirection || 'row') === 'row' || ref$ === 'row-reverse' ? 'row' : 'column';
  }, ref$.attr = function(){
    if (this.dir() === 'row') {
      return 'width';
    } else {
      return 'height';
    }
  }, ref$.estimate = function(){
    var attr, nodes, gs, sum, size, nsize, space;
    attr = this.attr();
    nodes = Array.from(this.root.childNodes);
    gs = nodes.map(function(n){
      return +getComputedStyle(n).flexGrow;
    });
    sum = gs.reduce(function(a, b){
      return a + b;
    }, 0);
    nodes.map(function(n){
      return n.style.flexGrow = 0;
    });
    size = this.root.getBoundingClientRect()[attr];
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
    return this._.totalGrow = sum;
  }, ref$.build = function(){
    var set;
    this._.gutters = Array.from(this.root.querySelectorAll(this._.selector));
    this._.gutterSet = new Set(this._.gutters);
    set = new Set();
    this._.gutters.map(function(g){
      return [g.previousSibling, g.nextSibling].map(function(n){
        if (set.has(n)) {} else {
          return set.add(n);
        }
      });
    });
    return this._.panes = Array.from(set);
  }, ref$.set = function(v){
    v == null && (v = []);
    this._.panes.map(function(n, i){
      return n.style.flexGrow = v[i] || 0;
    });
    return this.estimate();
  }, ref$);
  if (typeof window != 'undefined' && window !== null) {
    window.flexize = flexize;
  } else {
    module.exports = flexize;
  }
}).call(this);
