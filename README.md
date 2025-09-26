# Resizable

A lightweight, flexible panel resizing utility written in LiveScript that provides smooth drag-to-resize functionality for split-panel layouts with minimal configuration.


## Installation

### Browser

    <script src="resizable.js"></script>



## Quick Start

### HTML Structure (Pug Syntax)

```pug
.resizable-container#my-container
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
- Panels must have initial sizing via `flex-basis`
- Gutters must be visible and clickable with appropriate cursor
- Gutters must not shrink: `flex-shrink: 0`


### JavaScript Initialization

Basic usage example:

    const myResizable = new resizable({
      root: document.querySelector('#my-container')
    });

With custom options:

    const customResizable = new resizable({
      root: document.querySelector('#my-container'),
      minWidth: 150,
      gutterSelector: '.divider'
    });


## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `root` | DOM Element | **Required** | Container element holding the resizable panels |
| `minWidth` | Number | `100` | Minimum width for panels (in pixels) |
| `gutterSelector` | String | `'.gutter'` | CSS selector for drag dividers |


## API Reference

### Constructor

Creates a new resizable instance:

    new resizable({root, minWidth, gutterSelector})

### Instance Properties

- `root` - The container DOM element
- `minWidth` - Minimum panel width constraint
- `isDragging` - Current drag state (boolean)

### Methods

#### `init()`

Initializes event listeners and sets up the resizable functionality. Called automatically during construction.

#### `setupGutter(gutter)`

Attaches event listeners to a specific gutter element. Used internally during initialization.


## Examples

### Complete CSS Setup

```css
.resizable-container {
  display: flex;
  height: 400px;
  border: 1px solid #ccc;
}

.panel {
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;
}

.left-panel {
  flex-basis: 300px; /* Initial width */
  background: #f0f8ff;
}

.right-panel {
  flex-basis: 500px; /* Initial width */
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

### Multiple Resizable Containers

Sidebar resizer:

    const sidebarResizable = new resizable({
      root: document.querySelector('.sidebar-container'),
      minWidth: 200
    });

Main content resizer:

    const mainResizable = new resizable({
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

Initialize resizable:

    const resizable = new resizable({
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

The resizable module uses several key techniques:

1. **Flexbox Layout** - Panels use `flex-basis` for smooth, CSS-driven resizing
2. **Document-level Events** - Mouse move/up events are attached to `document` to prevent losing drag state when cursor moves outside panels
3. **Delta Calculations** - Tracks mouse movement distance to calculate new panel widths
4. **Constraint Enforcement** - Prevents panels from shrinking below the specified minimum width

### Event Flow

1. **MouseDown** on gutter → Start drag, store initial state
2. **MouseMove** on document → Calculate deltas, update panel sizes
3. **MouseUp** on document → End drag operation


## Browser Support

- Chrome 21+
- Firefox 28+
- Safari 6.1+
- Edge 12+
- IE 11+

Requires CSS flexbox support.


## Performance Notes

- Uses `flex-basis` instead of `width` for better performance
- Event listeners are efficiently managed with proper context binding
- No polling or continuous DOM queries during resize operations


## Troubleshooting

**Panels Not Resizing**
- Ensure parent container has `display: flex`
- Check that gutter elements match the specified selector
- Verify panels have initial `flex-basis` values

**Drag Not Working**
- Confirm gutter has `cursor: col-resize` and appropriate width
- Check for JavaScript errors in browser console
- Ensure root element is properly passed to constructor

**Panels Too Small**
- Adjust the `minWidth` option to a larger value
- Check for CSS conflicts that might override flex properties


## Contributing

This module follows LiveScript constructor patterns and modern JavaScript best practices. See the source code for implementation details.


## License

MIT License - feel free to use in your projects.

---

**Note:** This README assumes familiarity with HTML, CSS, and JavaScript. For LiveScript-specific implementation details, refer to the source code comments.
