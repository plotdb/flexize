(function(){
  var flexize, ref$;
  flexize = function(arg$){
    var ref$, root, minWidth, ref1$, gutterSelector;
    ref$ = arg$ != null
      ? arg$
      : {}, root = ref$.root, minWidth = (ref1$ = ref$.minWidth) != null ? ref1$ : 100, gutterSelector = (ref1$ = ref$.gutterSelector) != null ? ref1$ : '.gutter';
    this._opt = {
      root: root,
      minWidth: minWidth,
      gutterSelector: gutterSelector
    };
    this.root = root;
    this.minWidth = minWidth;
    this.gutterSelector = gutterSelector;
    this.isDragging = false;
    this.isHorizontal = true;
    this.leftPanel = void 8;
    this.rightPanel = void 8;
    this.initialLeftWidth = void 8;
    this.initialRightWidth = void 8;
    this.initialX = void 8;
    this.init();
    return this;
  };
  flexize.prototype = (ref$ = Object.create(Object.prototype), ref$.constructor = flexize, ref$.init = function(){
    var computedStyle, flexDirection, gutters, this$ = this;
    computedStyle = getComputedStyle(this.root);
    flexDirection = computedStyle.flexDirection || 'row';
    this.isHorizontal = flexDirection === 'row' || flexDirection === 'row-reverse';
    gutters = this.root.querySelectorAll(this.gutterSelector);
    return gutters.forEach(function(gutter){
      return this$.setupGutter(gutter);
    });
  }, ref$.setupGutter = function(gutter){
    var this$ = this;
    gutter.addEventListener('mousedown', function(e){
      return this$.onMouseDown.apply(this$, [e]);
    });
    document.addEventListener('mousemove', function(e){
      return this$.onMouseMove.apply(this$, [e]);
    });
    return document.addEventListener('mouseup', function(e){
      return this$.onMouseUp.apply(this$, [e]);
    });
  }, ref$.onMouseDown = function(e){
    var gutter;
    this.isDragging = true;
    e.preventDefault();
    gutter = e.currentTarget;
    this.leftPanel = gutter.previousElementSibling;
    this.rightPanel = gutter.nextElementSibling;
    if (this.isHorizontal) {
      this.initialLeftWidth = this.leftPanel.offsetWidth;
      this.initialRightWidth = this.rightPanel.offsetWidth;
      return this.initialX = e.clientX;
    } else {
      this.initialLeftWidth = this.leftPanel.offsetHeight;
      this.initialRightWidth = this.rightPanel.offsetHeight;
      return this.initialX = e.clientY;
    }
  }, ref$.onMouseMove = function(e){
    var delta, newLeftWidth, newRightWidth;
    if (!this.isDragging) {
      return;
    }
    delta = this.isHorizontal
      ? e.clientX - this.initialX
      : e.clientY - this.initialX;
    newLeftWidth = this.initialLeftWidth + delta;
    newRightWidth = this.initialRightWidth - delta;
    if (newLeftWidth > this.minWidth && newRightWidth > this.minWidth) {
      this.leftPanel.style.flexBasis = newLeftWidth + "px";
      return this.rightPanel.style.flexBasis = newRightWidth + "px";
    }
  }, ref$.onMouseUp = function(e){
    return this.isDragging = false;
  }, ref$);
  if (typeof window != 'undefined' && window !== null) {
    window.flexize = flexize;
  } else {
    module.exports = flexize;
  }
}).call(this);
