flexize = ({root, min-width = 100, gutter-selector = '.gutter'} = {}) ->
  # Store original options for potential reconfiguration - see docs for all options
  @_opt = {root, min-width, gutter-selector}
  
  # Batch set instance variables with destructured parameters
  @ <<<
    root: root
    min-width: min-width
    gutter-selector: gutter-selector
    is-dragging: false
    is-horizontal: true # Will be set correctly in init()
    left-panel: void
    right-panel: void
    initial-left-width: void
    initial-right-width: void
    initial-x: void
  
  @init!
  @

# Reconstruct clean prototype and import all methods at once
flexize.prototype = Object.create(Object.prototype) <<<
  constructor: flexize
  
  init: ->
    # Auto-detect flex direction to support both horizontal and vertical layouts
    computed-style = getComputedStyle @root
    flex-direction = computed-style.flexDirection or 'row'
    @is-horizontal = flex-direction in ['row', 'row-reverse']
    
    gutters = @root.query-selector-all @gutter-selector
    # Attach mouse events for each divider - see configuration docs
    gutters.for-each (gutter) ~> @setup-gutter gutter

  setup-gutter: (gutter) ->
    # Use document-level events to prevent losing drag state when cursor moves outside panels
    gutter.add-event-listener 'mousedown', (e) ~> @on-mouse-down.apply @, [e]
    document.add-event-listener 'mousemove', (e) ~> @on-mouse-move.apply @, [e]
    document.add-event-listener 'mouseup', (e) ~> @on-mouse-up.apply @, [e]

  on-mouse-down: (e) ->
    @is-dragging = true
    e.prevent-default!
    
    # Get adjacent panels using DOM traversal
    gutter = e.current-target
    @left-panel = gutter.previous-element-sibling
    @right-panel = gutter.next-element-sibling
    
    # Store initial state for delta calculations - handle both directions
    if @is-horizontal
      @initial-left-width = @left-panel.offset-width
      @initial-right-width = @right-panel.offset-width
      @initial-x = e.client-x
    else
      @initial-left-width = @left-panel.offset-height
      @initial-right-width = @right-panel.offset-height
      @initial-x = e.client-y

  on-mouse-move: (e) ->
    return unless @is-dragging
    
    # Calculate delta based on direction
    delta = if @is-horizontal then (e.client-x - @initial-x) else (e.client-y - @initial-x)
    new-left-width = @initial-left-width + delta
    new-right-width = @initial-right-width - delta
    
    # Prevent panels from becoming too small - see min-width option in docs
    if (new-left-width > @min-width and new-right-width > @min-width)
      @left-panel.style.flex-basis = "#{new-left-width}px"
      @right-panel.style.flex-basis = "#{new-right-width}px"

  on-mouse-up: (e) ->
    @is-dragging = false

# Cross-environment export - compact condition syntax with =>
if window? => window.flexize = flexize else module.exports = flexize