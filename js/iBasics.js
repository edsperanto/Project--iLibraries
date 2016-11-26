// const
var ZERO = 0;
var ONE = 1;
var MODE = { // param for tree() in doublyLinkedList()
  MAX: 'detailed',
  MIN: 'simplified',
  ONE: 'selected-only'
};
var EMPTY_STRING = '';
var SPACE = ' ';
var COMMA = ',';
var COLON = ':';
var TAB = '\t'; // tab
var NL = '\n'; // new line
var SQ = '\''; // single quote
var OCB = '{'; // open curly bracket
var CCB = '}'; // closing curly bracket

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
    function _strMatch(strToMatch) {
      function _in() {
        function _string(strMatchedFrom) {
          var stmlen = strToMatch.length;
          var smflen = strMatchedFrom.length;
          for(var i = 0; i <= (smflen-stmlen); i++) {
            if(strMatchedFrom.substr(i, stmlen) === strToMatch) {
              return strMatchedFrom;
            }
          }
          return null;
        }
        function _array(arr) {
          var currMatch;
          var matchArr = [];
          var arrLength = arr.length;
          for(var i = 0; i < arrLength; i++) {
            currMatch = to.finding.strMatch(strToMatch).in.string(arr[i]);
            if(currMatch !== null) {
              matchArr.push(currMatch);
            }
          }
          return matchArr;
        }
        return {
          string: _string,
          array: _array
        };
      }
      return { in: _in() };
    }
    function _property(propToMatch) {
      function _in() {
        function _object(obj) {
          var tmpPropList = Object.getOwnPropertyNames(obj);
          var match = to.finding.strMatch(propToMatch).in.array(tmpPropList);
          if(match.length > 0) { return obj[match[0]]; }
        }
        return { object: _object };
      }
      return { in: _in() };
    }
    function _nextNumberOfPropertyList(property) {
      function _in(obj) {
        var tmpPropList = Object.getOwnPropertyNames(obj);
        var matchNum = to.finding.strMatch(property).in.array(tmpPropList).length;
        return (matchNum + 1);
      }
      return { in: _in };
    }
    return {
      strMatch: _strMatch,
      property: _property,
      nextNumberOfPropertyList: _nextNumberOfPropertyList
    };
  }

  // doublyLinkedList
  var _doublyLinkedList = (function(newValue, newParent) {

    // const
    var VALUE = 'value';
    var PARENT = 'parent';
    var DEPTH = 'depth';
    var CHILD = 'child';
    var BD = '│'; // branch down
    var BO = '├'; // branch out
    var BE = '└'; // branch end

    // variables
    var _ll = {};
    var returnObj = {
      head: _ll,
      child: _child,
      findChild: _findChild,
      deepSearch: _deepSearch,
      tree: _tree,
      addChild: _addChild,
      addProperty: _addProperty,
      addPropertyList: _addPropertyList
    };

    // add properties to node (auto run)
    (function _addBasicProperties() {
      _addProperty(VALUE, newValue);
      _addProperty(PARENT, (newParent === undefined) ? null : newParent);
      _addProperty(DEPTH, (_ll[PARENT] === null) ? ONE : (_ll[PARENT].depth + ONE));
    })();

    // return child of node (num known)
    function _child(num) {
      return _ll[CHILD + num];
    }

    // return child of node (num unknown) in next depth, search through value
    function _findChild(value) {
      var _searchNum = ONE;
      var _searchedChild = _ll[CHILD + _searchNum];
      while(_searchedChild.value !== value) {
        _searchNum++;
        _searchedChild = _ll[CHILD + _searchNum];
      }
      return _ll[CHILD + _searchNum];
    }

    // find child of node (num unknown) in all depth, search through value
    function _deepSearch() {

    }

    // display node tree
    function _tree(mode, last, newLayer, tabStr) {
      // variables
      var tabs = EMPTY_STRING;
      var lastTab = EMPTY_STRING;
      var tempStr = EMPTY_STRING;
      var endOfBranch = false;
      var isLastChild = false;
      // track tabs needed
      (function trackTabs() {
        if(tabStr === undefined) {
          tabs = TAB;
        }else{
          tabs += tabStr;
        }
        switch(mode) {
          case MODE.MAX:
            if(tabStr !== undefined) { tabs += TAB; }
            break;
          case MODE.MIN:
            if(newLayer === true) {
              tabs += TAB + BD;
            }
            break;
        }
        lastTab = tabs.substr(1);

      })();
      // add new lines
      function newLine(str) {
        tempStr = tempStr + str + NL;
      }
      // show node name if is DOM node
      function _displayNode(node) {
        var newNode;
        if(node === null) { return null; }
        return (node.nodeName === undefined) ? (node) : (node.nodeName);
      }
      // disp child
      function dispChild(tabNum) {
        var num = 1;
        var checkLast = false;
        var isNewLayer = true;
        while(true) {
          if(_child(num) === undefined) { break; } // break when no more child
          switch(mode) {
            case MODE.MAX:
              if(_child(num+1) === undefined) { checkLast = true; }
              newLine(tabs + CHILD + num + COLON + SPACE + _child(num).tree(mode, checkLast, false, tabs));
              break;
            case MODE.MIN:
              if(_child(num+1) === undefined) { checkLast = true; }
              tempStr += _child(num).tree(mode, checkLast, isNewLayer, tabs);
              break;
            case MODE.ONE:
              newLine(tabs + CHILD + num + COLON + SPACE + OCB + SPACE + "value: " + _child(num).value + SPACE + CCB + COMMA);
              if(_child(num+1) === undefined) { checkLast = true; }
              if(checkLast) { tempStr = tempStr.substr(0, (tempStr.length-2)); }
          }
          num++;
        }
      }
      // show branches
      function showBranches(lastTab) {
        var tabStr;
        if(newLayer) {
          if(!last) {
            tabStr = lastTab.substr(0, (lastTab.length-1));
            return tabStr + BO + SPACE;
          }else{
            tabs = tabs.substr(0, (tabs.length-2));
            tabs += TAB;
            lastTab = tabs.substr(1);
            tabStr = lastTab.substr(0, (lastTab.length-1));
            return tabStr + TAB + BE + SPACE;
          }
        }else{
          return lastTab;
        }
      }
      // return closing bracket depending on if last
      function _closingBracket() {
        if(last || last === undefined) {
          return CCB;
        }else{
          return CCB + COMMA;
        }
      }
      // display tree depending on mode
      switch(mode) {
        case MODE.MAX:
          newLine(OCB);
          newLine(tabs + "value: " + _displayNode(_ll[VALUE]) + COMMA);
          newLine(tabs + "parent: " + _displayNode(_ll[PARENT]?_ll[PARENT].value:null) + COMMA);
          newLine(tabs + "depth: " + _ll[DEPTH] + COMMA);
          dispChild();
          tempStr += lastTab + _closingBracket();
          break;
        case MODE.MIN:
          newLine(showBranches(lastTab) + _displayNode(_ll[VALUE]));
          dispChild();
          break;
        case MODE.ONE:
          newLine(OCB);
          newLine(tabs + "value: " + _displayNode(_ll[VALUE]) + COMMA);
          newLine(tabs + "parent: " + _displayNode(_ll[PARENT]?_ll[PARENT].value:null) + COMMA);
          newLine(tabs + "depth: " + _ll[DEPTH] + COMMA);
          dispChild();
          newLine(NL + CCB);
          break;
        default:
          newLine(SQ + mode + SQ + " is not a valid mode");
      }
      // return final string
      return tempStr;
    }

    // add child node
    function _addChild(value) {
      var _newChildStr = CHILD + to.finding.nextNumberOfPropertyList(CHILD).in(this.head);
      _ll[_newChildStr] = _doublyLinkedList(value, this);
      returnObj[_newChildStr] = _ll[_newChildStr];
      return _ll[_newChildStr];
    }

    // add property to node
    function _addProperty(newProperty, newValue) {
      _ll[newProperty] = newValue;
      returnObj[newProperty] = _ll[newProperty];
      return _ll[newProperty];
    }

    // add property list to node
    function _addPropertyList(propertyListName, value) {
      var _newPropertyStr = propertyListName + to.finding.nextNumberOfPropertyList(propertyListName).in(this.head);
      _ll[_newPropertyStr] = value;
      returnObj[_newPropertyStr] = _ll[_newPropertyStr];
      return _ll[_newPropertyStr];
    }

    return returnObj;

  });

  // return object
  return {
    mapping: _mapping,
    setting: _setting(),
    finding: _finding(),
    doublyLinkedList: _doublyLinkedList
  };
});

// assign iBasics() to "to"
var to = iBasics();