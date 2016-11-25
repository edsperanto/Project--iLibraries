var iBasics = (function(){

  // map...
  function _mapping(item) {
    function _from(arrayOfOrigin) {
      function _to(arrayOfDestination) {
        for(i = 0; i < arrayOfOrigin.length; i++) {
          if(arrayOfOrigin[i] === item) {
            return arrayOfDestination[i];
          }
        }
        console.log("Mapping", item, "from", arrayOfOrigin,
          "to", arrayOfDestination, "resulted in no match");
      }
      return { to: _to };
    }
    return { from: _from };
  }

  // set new...
  function _setting() {
    function _newProperty(property) {
      function _to(value) {
        function _in(obj) {
          obj[property] = value;
        }
        return { in: _in };
      }
      return { to: _to };
    }
    function _newPropertyOfList(property) {
      function _to(value) {
        function _in(obj) {
          var newPropertyListNum = to.finding._nextNumberOfPropertyList(property).in(obj);
          obj[property + newPropertyListNum] = value;
        }
        return { in: _in };
      }
      return { to: _to };
    }
    return {
      newProperty: _newProperty,
      newPropertyOfList: _newPropertyOfList
    };
  }

  // find...
  function _finding() {
    function _nextNumberOfPropertyList(property) {
      function _in(obj) {
        var matches = 0;
        Object.getOwnPropertyNames(obj);
      }
      return { in: _in };
    }
    return {
      nextNumberOfPropertyList: _nextNumberOfPropertyList
    };
  }

  // doublyLinkedList
  function _doublyLinkedList(newValue, newParent) {
    // const
    var VALUE = 'value';
    var PARENT = 'parent';
    var DEPTH = 'depth';
    var CHILD = 'child';

    // variables
    var _ll = {};
    var _childStr = 'child1';

    // add properties to node
    _ll[VALUE] = newValue;
    _ll[PARENT] = newParent;
    _ll[DEPTH] = _getDepth();

    // add 'depth' property to node
    function _getDepth() {
      if(_ll[PARENT] === null) {
        return 1;
      }else{
        return (_ll[PARENT].depth + 1);
      }
    }

    // return parent of node
    function _parent() {
      return _ll[PARENT];
    }

    // return value of node
    function _value() {
      return _ll[VALUE];
    }

    // return depth of node
    function _depth() {
      return _ll[DEPTH];
    }

    // return child of node (num known)
    function _child(num) {
      //console.log(_ll[CHILD + num]);
      return _ll[CHILD + num];
    }

    // return child of node (num unknown), search through value
    function _findChild(value) {
      var _searchNum = 0;
      var _searchedChild = _ll[CHILD + _searchNum];
      while(searchedChild.value !== value) {
        if(searchedChild.value === value) {
          return searchedChild;
        }else if(searchedChild === undefined) {
          break;
        }
        _searchNum++;
        _searchedChild = _ll[CHILD + _searchNum];
      }
      return _ll[CHILD + num];
    }

    // display node tree
    function _tree() {
      var tabs = "";
      var lastTab = "";
      var tempStr = "";

      for(var i = 0; i < _depth(); i++) {
        tabs += "\t";
      }
      for(var j = 1; j < _depth(); j++) {
        lastTab += "\t";
      }

      function newLine(str) {
        tempStr = tempStr + str + "\n";
      }

      function dispParent(parent) {
        if(_ll[PARENT] === null) {
          return null;
        }else{
          return _ll[PARENT].value;
        }
      }

      function dispChild(tabNum) {
        var num = 1;
        while(true) {
          if(_child(num) === undefined) {
            break;
          }
          newLine(tabs + CHILD + num + ": " + _child(num).tree());
          num++;
        }
      }

      newLine("{");
      newLine(tabs + "value: " + _ll[VALUE] + ",");
      newLine(tabs + "parent: " + dispParent(_ll[PARENT]) + ",");
      newLine(tabs + "depth: " + _ll[DEPTH] + ",");
      dispChild();
      newLine(lastTab + "}");

      return tempStr;
    }

    // return head of current node
    function _head() {
      return _ll;
    }

    // add child node
    function _addChild(value) {
      //var _newChildStr = finding.nextNumberOfPropertyList(CHILD);
      _ll[_childStr] = _doublyLinkedList(value, this);
    }

    return {
      parent: _parent(),
      value: _value(),
      depth: _depth(),
      child: _child,
      findChild: _findChild,
      tree: _tree,
      head: _head(),
      addChild: _addChild
    };

  }

  //
  var returnObj = {
    mapping: _mapping,
    setting: _setting(),
    finding: _finding(),
    doublyLinkedList: _doublyLinkedList
  };
  var then = returnObj;

  return returnObj;
});

var to = iBasics();
var myLL = to.doublyLinkedList('document', null);
console.log(myLL.tree());
myLL.addChild('lol');
console.log(myLL.tree());