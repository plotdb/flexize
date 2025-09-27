ress = []
view = new ldview do
  root: document.body
  init: root: ({node}) -> ress.push(res = new flexize root: node)
  action: click:
    reset: -> ress.0.set [0,1,1]
    hide: -> view.get(\middle).style.display = \none

