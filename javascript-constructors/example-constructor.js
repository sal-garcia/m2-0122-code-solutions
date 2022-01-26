function ExampleConstructor() {

}
console.log('value of example constructor', ExampleConstructor.prototype);
console.log('type of exampleConstructor', typeof ExampleConstructor);

var newVariable = new ExampleConstructor();

console.log(newVariable);

console.log(newVariable instanceof ExampleConstructor);
