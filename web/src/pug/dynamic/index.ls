ress = []
view = new ldview do
  root: document.body
  init: list: ({node}) ->
    res = new flexize do
      root: node
      gutter-selector: ':scope > *:not(.list) > .dg, :scope > .dg'
    ress.push res
  action: click:
    add: ->
      lists = view.getAll('list')
      lists.map (list) ->
        gut = document.createElement \div
        gut.classList.add \dg, \added
        cell = document.createElement \div
        cell.classList.add \cell, \added
        cell.innerHTML = """
        <div class="dg added"></div>
        <span>Added</span>
        <div class="dg added"></div>
        """
        list.appendChild gut
        list.appendChild cell
    reset: ->
      ress.1.set [0,1,1]
      view.get(\middle).style.display = ''
    hide: -> view.get(\middle).style.display = \none
