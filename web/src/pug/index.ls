view = new ldview do
  root: document.body
  init:
    root: ({node}) -> res = new flexize root: node
