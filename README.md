# Flexize

A lightweight, flexible panel resizing utility written in LiveScript that provides smooth drag-to-resize functionality for split-panel layouts with minimal configuration.


## Installation

install:

    npm install --save flexize


and include the main script ( from local or cdn if available ):

    <script src="index.min.js"></script>


## Quick Start

### HTML Structure (Pug Syntax)

```pug
.flexize-container#my-container
  .panel.left-panel
    h3 Left Panel
    p Your content here...

  .gutter

  .panel.right-panel
    h3 Right Panel
    p Your content here...
```

### Minimal CSS Requirements

- Container must be a flexbox: `display: flex`
- **Panels should use pixel values for `flex-basis`** to prevent resize jumps
- **Use `flex-grow` and `flex-shrink` for responsive behavior**
- Gutters must be visible and clickable with appropriate cursor
- Gutters must not shrink: `flex-shrink: 0`

### Important Sizing Guidelines

**✅ Recommended approach:**

    .panel {
      flex-basis: 200px;    /* Minimum reserved space (pixels) */
      flex-grow: 1;         /* Share remaining space proportionally */
      flex-shrink: 1;       /* Allow shrinking when necessary */
    }

**❌ Avoid mixing units or using percentages for flex-basis:**

    /* This causes resize jumps on first drag */
    .panel-1 { flex-basis: 30%; }
    .panel-2 { flex-basis: 200px; }
    .panel-3 { flex-basis: 40%; }

### JavaScript Initialization

Basic usage example:

    const myFlexizer = new flexize({
      root: document.querySelector('#my-container')
    });

With custom options:

    const customFlexizer = new flexize({
      root: document.querySelector('#my-container'),
      minWidth: 150,
      gutterSelector: '.divider'
    });


## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `root` | DOM Element | **Required** | Container element holding the flexize panels |
| `minWidth` | Number | `100` | Minimum width for panels (in pixels) |
| `gutterSelector` | String | `'.gutter'` | CSS selector for drag dividers |


## API Reference

### Constructor

Creates a new flexize instance:

    new flexize({root, minWidth, gutterSelector})

### Instance Properties

- `root` - The container DOM element
- `minWidth` - Minimum panel width constraint
- `isDragging` - Current drag state (boolean)
- `isHorizontal` - Layout direction (auto-detected)

### Methods

#### `init()`

Initializes event listeners and sets up the flexize functionality. Called automatically during construction.

#### `setupGutter(gutter)`

Attaches event listeners to a specific gutter element. Used internally during initialization.


## Examples

### Complete CSS Setup

```css
.flexize-container {
  display: flex;
  height: 400px;
  border: 1px solid #ccc;
}

.panel {
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
  /* Recommended: Use flex shorthand for responsive panels */
  flex: 1 1 200px; /* grow shrink basis */
}

.left-panel {
  flex: 1 1 200px;  /* Minimum 200px, takes 1 share of remaining space */
  background: #f0f8ff;
}

.right-panel {
  flex: 2 1 300px;  /* Minimum 300px, takes 2 shares of remaining space */
  background: #fff8f0;
}

.gutter {
  width: 8px;
  background: #666;
  cursor: col-resize;
  flex-shrink: 0;
  user-select: none;
}

.gutter:hover {
  background: #999;
}
```

### Vertical Layout Support

```css
.vertical-flexize {
  display: flex;
  flex-direction: column; /* Automatically detected by flexize */
  height: 600px;
}

.top-panel {
  flex: 1 1 150px;  /* Minimum 150px height, grows proportionally */
}

.bottom-panel {
  flex: 2 1 200px;  /* Minimum 200px height, takes 2x remaining space */
}

.horizontal-gutter {
  height: 8px;
  width: 100%;
  cursor: row-resize; /* For vertical layouts */
  flex-shrink: 0;
}
```

### Multiple Flexize Containers

Sidebar flexizer:

    const sidebarFlexizer = new flexize({
      root: document.querySelector('.sidebar-container'),
      minWidth: 200
    });

Main content flexizer:

    const mainFlexizer = new flexize({
      root: document.querySelector('.main-container'),
      minWidth: 300,
      gutterSelector: '.main-divider'
    });

### Custom Gutter Styling

```css
.custom-gutter {
  width: 12px;
  background: linear-gradient(90deg, #ddd, #999, #ddd);
  cursor: col-resize;
  position: relative;
}

.custom-gutter::before {
  content: '⋮⋮⋮';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;
  font-size: 14px;
  line-height: 0.5;
}
```

### Dynamic Panel Content

Initialize flexize:

    const flexizer = new flexize({
      root: document.querySelector('#dynamic-container'),
      minWidth: 120
    });

Add dynamic content:

    document.querySelector('.left-panel').innerHTML = `
      <form>
        <input type="text" placeholder="Search...">
        <button>Submit</button>
      </form>
    `;


## How It Works

The flexize module uses several key techniques:

1. **Flexbox Layout** - Panels use `flex-basis` for smooth, CSS-driven resizing
2. **Auto Direction Detection** - Automatically detects `flex-direction` to support both horizontal and vertical layouts
3. **Document-level Events** - Mouse move/up events are attached to `document` to prevent losing drag state when cursor moves outside panels
4. **Delta Calculations** - Tracks mouse movement distance to calculate new panel sizes
5. **Constraint Enforcement** - Prevents panels from shrinking below the specified minimum width

### Event Flow

1. **MouseDown** on gutter → Start drag, store initial state
2. **MouseMove** on document → Calculate deltas, update panel sizes
3. **MouseUp** on document → End drag operation

### Direction Detection

Flexize automatically detects the container's `flex-direction`:
- `row` / `row-reverse` → Horizontal resizing (width-based)
- `column` / `column-reverse` → Vertical resizing (height-based)


## Browser Support

- Chrome 21+
- Firefox 28+
- Safari 6.1+
- Edge 12+
- IE 11+

Requires CSS flexbox support.


## Performance Notes

- Uses `flex-basis` instead of `width`/`height` for better performance
- Event listeners are efficiently managed with proper context binding
- No polling or continuous DOM queries during resize operations
- Auto-detects layout direction only once during initialization


## Troubleshooting

**Panels Not Resizing**
- Ensure parent container has `display: flex`
- Check that gutter elements match the specified selector
- Verify panels have initial `flex-basis` values

**Drag Not Working**
- Confirm gutter has appropriate cursor (`col-resize` for horizontal, `row-resize` for vertical)
- Check for JavaScript errors in browser console
- Ensure root element is properly passed to constructor

**Panels Too Small**
- Adjust the `minWidth` option to a larger value
- Ensure panels have adequate `flex-basis` values as minimum reserved space
- Check for CSS conflicts that might override flex properties

**Resize Jumps on First Drag**
- Avoid mixing percentage and pixel units in `flex-basis`
- Use pixel values for `flex-basis`: `flex-basis: 200px` instead of `flex-basis: 30%`
- Consider using the `flex` shorthand: `flex: 1 1 200px`

**Wrong Resize Direction**
- Flexize auto-detects from CSS `flex-direction`
- Ensure your CSS has the correct `flex-direction` value
- Check computed styles in browser dev tools


## Contributing

This module follows LiveScript constructor patterns and modern JavaScript best practices. See the source code for implementation details.


## License

MIT License - feel free to use in your projects.

---

**Note:** This README assumes familiarity with HTML, CSS, and JavaScript. For LiveScript-specific implementation details, refer to the source code comments.
