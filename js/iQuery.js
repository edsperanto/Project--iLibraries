// iQuery (super original name)
var iQuery = (function(elementName) {
  // const
  var FIRST_CHAR = 0;
  var FROM_SECOND_CHAR = 1;
  var FIRST_ITEM = 0;
  var ID_SELECTOR = '#';
  var CLASS_SELECTOR = '.';
  var DEVICES = {
    MOUSE: 'mouse',
    KEYBOARD: 'keyboard'
  };

  // variables
  var firstChar;
  var _selection;

  // select depending on if element is class, id, or tag (auto run)
  (function _performSelection() {
    // trimming out spaces and detecting selection type
    elementName = elementName.trim();
    firstChar = elementName.charAt(FIRST_CHAR);
    // distinguish class, id, or tag
    if(firstChar === ID_SELECTOR) {
      elementName = elementName.substr(FROM_SECOND_CHAR);
      _selection = document.getElementById(elementName);
      _doesntExist();
    }else{ // actions for class & tag
      if(firstChar === CLASS_SELECTOR) { // actions for class
        elementName = elementName.substr(FROM_SECOND_CHAR);
        _selection = document.getElementsByClassName(elementName);
      }else{ // actions for tag
        firstChar = null;
        _selection = document.getElementsByTagName(elementName);
      }
      switch(_selection.length) {
        case 0:
          _selection = null;
          _doesntExist();
          break;
        case 1:
          _selection = _selection[0];
          break;
      }
    }
  })();

  // map mouse actions
  function _mapMouseActions(action) {
    var myActionList = ['click', 'doubleClick', 'enter', 'over', 'move', 'down', 'up', 'rightClick', 'wheel', 'leave', 'out', 'select'];
    var mouseActionList = ['click', 'dblclick', 'mouseenter', 'mouseover', 'mousemove', 'mousedown', 'mouseup', 'contextmenu', 'wheel', 'mouseleave', 'mouseout', 'select'];
    var mouseAction = to.mapping(action).from(myActionList).to(mouseActionList);
    return mouseAction;
  }

  // add event handler
  function _onEvent(device, action, myFunction) {
    if(firstChar === ID_SELECTOR) {

    }else if(firstChar === CLASS_SELECTOR || firstChar === null){
      if(device === DEVICES.MOUSE) {
        _addMouseEventsForClass(action, myFunction);
      }
    }
  }

  // add event handler -> class -> mouse
  function _addMouseEventsForClass(action, myFunction) {
    var _mouseAction = _mapMouseActions(action);
    var _selectionLength = _selection.length;
    for(var i = 0; i < _selectionLength; i++) {
      _selection[i].addEventListener(_mouseAction, myFunction);
    }
  }

  // remove event handler
  function _noEvent(device, action, myFunction) {
    if(firstChar === ID_SELECTOR) {

    }else if(firstChar === CLASS_SELECTOR){
      if(device === DEVICES.MOUSE) {
        _removeMouseEventsForClass(action, myFunction);
      }
    }
  }

  // remove event handler -> class -> mouse
  function _removeMouseEventsForClass(action, myFunction) {
    var _mouseAction = _mapMouseActions(action);
    var _selectionLength = _selection.length;
    for(var i = 0; i < _selectionLength; i++) {
      _selection[i].removeEventListener(_mouseAction, arguments.callee, false);
    }
  }

  // check if element does not exist
  function _doesntExist() {
    var errorStr = "";
    if(_selection) {
      return false;
    }else{
      // console.log error message
      switch(firstChar) {
        case '.':
          errorStr += "element of class \'" + elementName + "\' ";
          break;
        case '#':
          errorStr += "element of id \'" + elementName + "\' ";
          break;
        default:
          errorStr += "element of tag \'" + elementName + "\' ";
          break;
      }
      errorStr += "does not exist";
      console.log(errorStr);
      return true;
    }
  }

  return {
    item: _selection, // return selected item(id) or array(class)
    onEvent: _onEvent, // addEventListener
    noEvent: _noEvent, // removeEventListener
    doesntExist: _doesntExist // check if item does not exist
  };
});

// assign to "$"
var $ = iQuery;

// testing area
// var myLL = to.doublyLinkedList(document);
// myBody = myLL.addProperty('myBody', $('body').item);
//var myBody = to.finding.property('myBody').in.object(myLL.head);