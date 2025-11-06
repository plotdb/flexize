# Flexize

flex-grow-based panel resizing tool for flexbox.


## Usage

install with npm:

    npm install --save flexize


and include the main script ( from local or cdn if available ):

    <script src="index.min.js"></script>


create a flexize object with the flexbox you'd like to resize:

    fx = new flexize({root: 'selector or the node instance'})


Constructor options:

 - `root`: container element or selector of it. should be a flexbox.
 - `gutter-selector`: optional. default `.flexize-gutter`.
   - selector of nodes that works as bar to be dragged.
 - `fixed-selector`: optional. defaut `.flexize-fixed`.
   - selector of panes that flexize should not resize.


## DOM Construct

flexize is used to support resizing of your panes inside a flexbox. To resize, you need something to drag called `gutter`. Simply add any number of gutters between panes you'd like to resize:

    div(style="display:flex;align-items:stretch")
      div Adjustable by A
      .flexize-gutter(style="width:5px;background:#000") A
      div Adjustable by A
      .flexize-fixed Fixed Size
      div Adjustable by B
      .flexize-gutter(style="width:5px;background:#000") B
      div Adjustable by B

flexize uses `flex-grow` to resize panes so you should:

1. consider `flex-basis` as the minimal width of a panel
2. optional provide initial `flex-grow` as a hint of how the free space should be distribute.
  - flexize will give all free space to the very first non-fixed element if no hint is given.
3. keep `flex-shrink` as 0

Here is another example with flex provided:

    div(style="display:flex;align-items:stretch")
      div(style="flex:1 0 100px")
      .gutter(style="width:5px;background:#000")
      div(style="flex:0 0 100px")

Fixed nodes and Hidden nodes (with `display` set to `none`) will be ignored and all gutters will automatically look up for the next visible panes to resize.


## Gutters Inside a Cell

You can place gutters inside a cell element:

    .container
      .cell
        .gutter
      .cell
        .gutter
        span content
        .gutter
      .cell
        .gutter

flexize determines inner gutters based on their position within a cell:

 - first child: works as gutter before its host cell
 - last child: works as gutter after its host cell
 - only child: works as gutter for both side around its host cell

Note that based on the selector you used, a gutter may affect grandparent nodes. use explicit selector to only select a desired child as gutter if necessary. See `web/src/pug/nested` for a live example.


## APIs 

 - `set(list = [])`: manual set flex-grow from values in `list` array.
 - `build()`: prepare required DOM and initialize them
 - `estimate()`: recalculate spaces available for flex to resizing
 - `reset()`: reset space distribution to initial state. Include `build()` and `estimate()` combo
 - `dir(opt)`: return current direction ( `row` or `column` ) as a string.
   - it returns cached value, so please use `reset` if you need the latest value.
   - `opt`: optional object with following parameter:
     - `reset`: optional. default false. when true, get and cache a new value from latest computed result.
 - `reverse(opt)`: return true if current flex direction is reversed.
   - `opt`: see `dir(opt)`.
   - like `dir(opt)`, this is also cached.
 - `attr(opt)`: return attribute name of the direction to grow, either `width` or `height`.
   - `opt`: see `dir(opt)`.
   - like `dir(opt)`, this is also cached.
 - `fire(n, v)`: fire an event named `n` with value `v`.
 - `on(n, cb)`: listen to event `n` and handle by callback function `cb`.
   - `n` can be either a string or an array.


## License

MIT License
