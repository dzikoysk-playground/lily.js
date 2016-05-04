# Extension API

Extension must be defined under the main script of editor
```html
<script src="lily.js"></script>
<script src="example_extension.js"></script>
```
Extensions are based on prototype
```javascript
function ExampleExtension() {
    this.someVar = 'something';
}

ExampleExtension.prototype.exampleFunction = function() {
    // something
}
```
Add method ```onload```. It will be called after loading
```javascript
// @Override
ExampleExtension.prototype.onload = function(lily) {
    // your code goes here
};
```
Register your extension
```javascript
var exampleExtension = new ExampleExtension();
lily.registerExtension(exampleExtension);
```