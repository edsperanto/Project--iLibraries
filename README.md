# iLibraries

## What is this?

"iLibraries" (super original name) is a lightweight library I created to simplify my workflow when doing javascript. It consists of 5 .js files:

1. iLibraries.js
2. iBasics.js
3. iQuery.js
4. iDom.js
5. iGeometry.js

These .js files build on each other, so they must be loaded on website in the listed order above.

## iLibraries.js

This is the file that loads all the other files into a html page. To use iLibraries on your website, simply add the following in your `<head>` tag:

```
<script src="directory/to/iLibraries.js"></script>
```
Super easy!

## iBasics.js

This is the file contains the foundation for the rest of the library (the remaining 3 .js files). Functionality in this file could be accessed by calling the `to` object. 

Example: `var myLL = to.doublyLinkedList('myValue');`

The reasoning behind this is that so it sounds like English when used. For instance in the above example, it sounds like "variable myLL equals to a doublyLinkedList containing 'myValue'."

## iQuery.js

You guessed it, this was inspired by jQuery, and it's supposed to act like jQuery too (I tried). Functionality in this file could be accessed by calling the `$(selection)` function. It acts like jQuery as you could select HTML elements by putting the tag name, class name, or id of the element inside the 'query selector' `$(HERE)`.

1. To select HTML elements by tag name, simply put the tag name inside quotation marks into the query selector. Example: `$('body')`
2. To select HTML elements by class name, put the class name inside quotation marks into the query selector preceded by a period (`.`). Example: `$('.classy-class-name')`
3. To select HTML elements by id, put the id inside quotation marks into the query selector preceded by a pound sign (`#`). Example: `$('#id-is-not-hashtag')`

After selecting an element, you could perform actions on the element just like jQuery, albeit not as advanced.

## iDom.js

In progress

## iGeometry.js

In progress

## Footnote

This lightweight library is open source, so you're welcome to copy it and help improve it. *cues 'fork' button*

Author: Me

Thank you for actually reading this README and showing interest.