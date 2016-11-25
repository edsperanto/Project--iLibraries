// const
var MODE = { // param for tree() in doublyLinkedList()
  MAX: 'detailed',
  MIN: 'simplified'
};

// iBasics
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
          var newPropertyListNum = to.finding.nextNumberOfPropertyList(property).in(obj);
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
  function _doublyLinkedList(newValue, newParent, last) {
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
    function _tree(mode, treeDepth, last) {
      // variables
      var tabs = "";
      var lastTab = "";
      var tempStr = "";
      // track tabs needed
      (function trackTabs() {
        var curNode = _ll;
        if(treeDepth === undefined) { treeDepth = 1; }
        for(var i = 0; i < treeDepth; i++) { tabs += "\t"; }
        lastTab = tabs.substr(1);
      })();
      // add new lines
      function newLine(str) {
        tempStr = tempStr + str + "\n";
      }
      // display parent value
      function dispParent(parent) {
        if(_ll[PARENT] === null) {
          return null;
        }else{
          return _ll[PARENT].value;
        }
      }
      // add child
      function dispChild(tabNum) {
        var num = 1;
        var checkLast = false;
        while(true) {
          if(_child(num) === undefined) { break; } // break when no more child
          switch(mode) {
            case MODE.MAX:
              newLine(tabs + CHILD + num + ": " + _child(num).tree(mode, (treeDepth+1)));
              break;
            case MODE.MIN:
              if(_child(num+1) === undefined) { checkLast = true; }
              newLine(_child(num).tree(mode, (treeDepth+1), checkLast));
              break;
          }
          num++;
        }
      }
      // show branches
      function showBranches() {
        if(treeDepth > 1) {
          if(!last) {
            return "┣ ";
          }else{
            return "┗ ";
          }
        }else{
          return "";
        }
      }
      // display tree depending on mode
      switch(mode) {
        case MODE.MAX:
          newLine("{");
          newLine(tabs + "value: " + _ll[VALUE] + ",");
          newLine(tabs + "parent: " + dispParent(_ll[PARENT]) + ",");
          newLine(tabs + "depth: " + _ll[DEPTH] + ",");
          dispChild();
          newLine(lastTab + "},");
          break;
        case MODE.MIN:
          newLine(lastTab + showBranches() + _ll[VALUE]);
          dispChild();
          break;
        default:
          newLine("\'" + mode + "\'" + " is not a valid mode");
      }


      return tempStr;
    }

    // return head of current node
    function _head() {
      return _ll;
    }

    // add child node
    function _addChild(value) {
      //var _newChildStr = finding.nextNumberOfPropertyList(CHILD);
      _newChildStr = _childStr;
      _ll[_newChildStr] = _doublyLinkedList(value, this);
      return _ll[_newChildStr];
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
console.log(myLL.tree(MODE.MAX));
var lol = myLL.addChild('lol');
console.log(myLL.tree(MODE.MAX));
var haha = lol.addChild('haha');
console.log(haha.parent.tree(MODE.MAX));
console.log(haha.parent.parent.tree(MODE.MIN));