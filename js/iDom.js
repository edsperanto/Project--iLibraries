// dom manager
var iDom = (function() {

  var _root = to.doublyLinkedList(document);
  _body = _root.addChild(document.getElementsByTagName('body')[0]);


  (function _autoGenStructure() {

  })();

  function _addElement(tag, label, text) {

  }

  function _showTree() {
    console.log(_root.tree(MODE.MIN));
  }

  return {
    currentElement: _root.head,
    showTree: _showTree
  };
});

var page = iDom();