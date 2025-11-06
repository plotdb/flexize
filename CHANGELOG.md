# Change Logs

## v0.0.9

 - fix bug: exception when `reverse` is called, due to use of undefined parameter name


## v0.0.8

 - support dynamic gutter insertion
 - fire resize event at the begin and end of a resizing session
 - add `reset` parameter in `dir`, `attr` and `reverse` API for clearing cached result


## v0.0.7

 - behavior changes: use position to determine sibling for inner gutter.


## v0.0.6

 - fix bug: `_visible-sibling` tried to get style of non-Element node.
 - fix bug: resizing doesn't work when new elements are added.


## v0.0.5

 - fix bug: reset fails due to typo in `initial-grow` name


## v0.0.4

 - fix bug: failed when working with style on non-Element nodes 
 - tweak default selector for fixed cells to make it work for nested flexize


## v0.0.3

 - trigger mouse move event handler only when dragging
 - support gutters inside cells
 - alter default gutter selector to support up to one level depth inner gutter


## v0.0.2

 - using flex-grow instead of flex-basis for resizing.
 - support manually set flex-grow
 - support reset api
 - support reversed direction
 - update document


## v0.0.1

init release
