ress = []
view = new ldview do
  root: document.body
  init: list: ({node}) ->
    res = new flexize do
      root: node
      gutter-selector: ':scope > *:not(.list) > .dg, :scope > .dg'
    ress.push res
  action: click:
    reset: ->
      ress.1.set [0,1,1]
      view.get(\middle).style.display = ''
    hide: -> view.get(\middle).style.display = \none
