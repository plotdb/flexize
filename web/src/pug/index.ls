ress = []
view = new ldview do
  root: document.body
  init: root: ({node}) -> ress.push(res = new flexize root: node)
  action: click:
    reset: ->
      ress.1.set [0,1,1]
      view.get(\middle).style.display = ''
    hide: -> view.get(\middle).style.display = \none

