// load elements
(function loadHTMLElements() {
  var element;
  // css
  element = document.createElement('link');
  element.href = 'css/style.css';
  element.rel = 'stylesheet';
  element.media = 'screen';
  document.head.appendChild(element);
  // div 1
  element = document.createElement('div');
  element.className = 'test-class';
  document.body.appendChild(element);
  // div 2
  element = document.createElement('div');
  element.id = 'test-id';
  document.body.appendChild(element);
})();

// testing -area- ^51 HUMAN SUBJECTS MKULTRA

// test for doublyLinkedList functionality
var myLL = to.doublyLinkedList(document.getElementsByTagName('body')[0]);
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


// test for deepSearch functionality
var test2 = (function testDeepSearch() {

});