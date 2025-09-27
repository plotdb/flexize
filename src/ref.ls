flexize = ({root, min-width = 100, gutter-selector = '.gutter'} = {}) ->
  # Store original options for potential reconfiguration
  @_opt = {root, min-width, gutter-selector}
  
  # Batch set instance variables with destructured parameters
  @ <<<
    root: root
    min-width: min-width
    gutter-selector: gutter-selector
    is-dragging: false
    is-horizontal: true
    left-panel: void
    right-panel: void
    initial-left-size: void
    initial-right-size: void
    initial-total-size: void
    initial-x: void
  
  @init!
  @

flexize.prototype = Object.create(Object.prototype) <<<
  constructor: flexize
  
  init: ->
    # Auto-detect flex direction to support both horizontal and vertical layouts
    computed-style = getComputedStyle @root
    flex-direction = computed-style.flexDirection or 'row'
    @is-horizontal = flex-direction in ['row', 'row-reverse']
    
    gutters = @root.query-selector-all @gutter-selector
    gutters.for-each (gutter) ~> @setup-gutter gutter

  setup-gutter: (gutter) ->
    # Use document-level events to prevent losing drag state
    gutter.add-event-listener 'mousedown', (e) ~> @on-mouse-down.apply @, [e]
    document.add-event-listener 'mousemove', (e) ~> @on-mouse-move.apply @, [e]
    document.add-event-listener 'mouseup', (e) ~> @on-mouse-up.apply @, [e]

  on-mouse-down: (e) ->
    @is-dragging = true
    e.prevent-default!
    
    gutter = e.current-target
    @left-panel = gutter.previous-element-sibling
    @right-panel = gutter.next-element-sibling
    
    # Store initial actual sizes
    @initial-left-size = @get-element-size @left-panel
    @initial-right-size = @get-element-size @right-panel
    @initial-total-size = @initial-left-size + @initial-right-size
    @initial-x = if @is-horizontal then e.client-x else e.client-y

  get-element-size: (element) ->
    # Get actual computed size - handles fit-content, min-width, etc.
    if @is-horizontal
      element.getBoundingClientRect!width
    else
      element.getBoundingClientRect!height

  on-mouse-move: (e) ->
    return unless @is-dragging
    
    # Calculate mouse delta
    current-pos = if @is-horizontal then e.client-x else e.client-y
    delta = current-pos - @initial-x
    
    # Calculate desired sizes
    desired-left = @initial-left-size + delta
    desired-right = @initial-right-size - delta
    
    # Determine which panel is shrinking (more likely to hit constraints)
    if delta > 0
      # Moving right: right panel shrinks, left panel grows
      @adjust-panels-right-shrinking desired-left, desired-right
    else
      # Moving left: left panel shrinks, right panel grows  
      @adjust-panels-left-shrinking desired-left, desired-right

  adjust-panels-right-shrinking: (desired-left, desired-right) ->
    # Step 1: Adjust the shrinking panel (right) first
    constrained-right = Math.max desired-right, @min-width
    @set-panel-size @right-panel, constrained-right
    
    # Step 2: Get actual right panel size after constraints
    actual-right = @get-element-size @right-panel
    actual-right-change = actual-right - @initial-right-size
    
    # Step 3: Compensate left panel with actual change
    compensated-left = @initial-left-size - actual-right-change
    
    # Step 4: Apply constraints to left panel
    final-left = Math.max compensated-left, @min-width
    @set-panel-size @left-panel, final-left
    
    # Step 5: Final verification and adjustment if needed
    @verify-and-adjust-total!

  adjust-panels-left-shrinking: (desired-left, desired-right) ->
    # Step 1: Adjust the shrinking panel (left) first
    constrained-left = Math.max desired-left, @min-width
    @set-panel-size @left-panel, constrained-left
    
    # Step 2: Get actual left panel size after constraints
    actual-left = @get-element-size @left-panel
    actual-left-change = actual-left - @initial-left-size
    
    # Step 3: Compensate right panel with actual change
    compensated-right = @initial-right-size - actual-left-change
    
    # Step 4: Apply constraints to right panel
    final-right = Math.max compensated-right, @min-width
    @set-panel-size @right-panel, final-right
    
    # Step 5: Final verification and adjustment if needed
    @verify-and-adjust-total!

  verify-and-adjust-total: ->
    # Verify total size conservation and make final adjustments
    actual-left = @get-element-size @left-panel
    actual-right = @get-element-size @right-panel
    current-total = actual-left + actual-right
    
    # Allow small tolerance for floating point precision
    size-difference = current-total - @initial-total-size
    
    if Math.abs(size-difference) > 1  # More than 1px difference
      # Try to redistribute the excess/deficit
      if size-difference > 0  # Overflow: try to shrink one panel
        @redistribute-overflow actual-left, actual-right, size-difference
      else  # Deficit: try to grow one panel
        @redistribute-deficit actual-left, actual-right, Math.abs(size-difference)

  redistribute-overflow: (actual-left, actual-right, overflow) ->
    # Try to reduce the larger panel first
    if actual-left > actual-right
      new-left = actual-left - overflow
      if new-left >= @min-width
        @set-panel-size @left-panel, new-left
        return
    
    # Otherwise try to reduce the right panel
    new-right = actual-right - overflow  
    if new-right >= @min-width
      @set-panel-size @right-panel, new-right

  redistribute-deficit: (actual-left, actual-right, deficit) ->
    # Try to increase the smaller panel first
    if actual-left < actual-right
      @set-panel-size @left-panel, actual-left + deficit
    else
      @set-panel-size @right-panel, actual-right + deficit

  set-panel-size: (panel, size) ->
    # Set flex-basis and force immediate style application
    panel.style.flex-basis = "#{size}px"
    
    # Synchronous approach: getBoundingClientRect forces layout calculation
    # This ensures the size change is applied before we measure
    panel.getBoundingClientRect!

  on-mouse-up: (e) ->
    @is-dragging = false

# Cross-environment export
if window? => window.flexize = flexize else module.exports = flexize