// const
var MODE = { // param for tree() in doublyLinkedList()
  MAX: 'detailed',
  MIN: 'simplified',
  ONE: 'selected-only'
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
    var TAB = '\t';
    var NL = '\n';
    var SQ = '\'';

    // variables
    var _ll = {};
    var returnObj = {
      head: _head(),
      child: _child,
      findChild: _findChild,
      deepSearch: _deepSearch,
      tree: _tree,
      addChild: _addChild,
      addProperty: _addProperty,
      addPropertyList: _addPropertyList
    };

    // add properties to node
    _addProperty(VALUE, newValue);
    _addProperty(PARENT, newParent === undefined ? null : newParent);
    _addProperty(DEPTH, _ll[PARENT] === null ? 1 : (_ll[PARENT].depth + 1));

    // return head of current node
    function _head() {
      return _ll;
    }

    // return child of node (num known)
    function _child(num) {
      return _ll[CHILD + num];
    }

    // return child of node (num unknown) in next depth, search through value
    function _findChild(value) {
      var _searchNum = 1;
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
      var tabs = "";
      var lastTab = "";
      var tempStr = "";
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
              tabs += TAB + "│";
            }
            break;
        }
        lastTab = tabs.substr(1);

      })();
      // add new lines
      function newLine(str) {
        tempStr = tempStr + str + NL;
      }
      // display parent value
      function dispParent(parent) {
        if(_ll[PARENT] === null) {
          return null;
        }else{
          return _ll[PARENT].value;
        }
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
              newLine(tabs + CHILD + num + ": " + _child(num).tree(mode, checkLast, false, tabs));
              break;
            case MODE.MIN:
              if(_child(num+1) === undefined) { checkLast = true; }
              tempStr += _child(num).tree(mode, checkLast, isNewLayer, tabs);
              break;
            case MODE.ONE:
              newLine(tabs + CHILD + num + ": { " + "value: " + _child(num).value +  " },");
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
            return tabStr + "├ ";
          }else{
            tabs = tabs.substr(0, (tabs.length-2));
            tabs += TAB;
            lastTab = tabs.substr(1);
            tabStr = lastTab.substr(0, (lastTab.length-1));
            return tabStr + TAB + "└ ";
          }
        }else{
          return lastTab;
        }
      }
      // return closing bracket depending on if last
      function _closingBracket() {
        if(last || last === undefined) {
          return "}";
        }else{
          return "},";
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
          tempStr += lastTab + _closingBracket();
          break;
        case MODE.MIN:
          newLine(showBranches(lastTab) + _ll[VALUE]);
          dispChild();
          break;
        case MODE.ONE:
          newLine("{");
          newLine(tabs + "value: " + _ll[VALUE] + ",");
          newLine(tabs + "parent: " + dispParent(_ll[PARENT]) + ",");
          newLine(tabs + "depth: " + _ll[DEPTH] + ",");
          dispChild();
          newLine(NL + "}");
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

// testing -area- ^51 HUMAN SUBJECTS MKULTRA
var myLL = to.doublyLinkedList('dank memes');
var lol = myLL.addChild('lol');
var fedora = myLL.addChild('fedora');
var god = myLL.addChild('there is no god');
lol.addChild('feminism');
lol.addChild('cats');
lol.addChild('interwebs');
lol.child2.addChild('meow');
lol.child2.addChild('nyan');
lol.child2.addChild('doraemon');
lol.child3.addChild('4chan');
lol.child3.addChild('reddit');
lol.child3.addChild('tumblr');
lol.child3.child2.addChild('iAMA');
lol.child3.child2.addChild('showerthoughts');
lol.child3.child2.addChild('circlejerk');
fedora.addChild('trench coat');
fedora.addChild('neckbeard');
god.addChild('there is only Julian');
god.findChild('there is only Julian').addChild('Shrek is love, Shrek is life');
console.log(myLL.tree(MODE.MIN));