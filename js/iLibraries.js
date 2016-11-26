// load scripts (iLibraries) (auto run)
(function loadScripts() {
  var i = 0;
  var script;
  var directory = ['js/iBasics.js', 'js/iQuery.js', 'js/iDom.js', 'js/iGeometry.js', 'js/script.js'];
  (function loopThroughJSFileDirectories(arr) {
    while(i < arr.length) {
      script = document.createElement('script');
      script.src = arr[i];
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
      script.onload = increment();
    }
    function increment() { i++; }
  })(directory);
})();