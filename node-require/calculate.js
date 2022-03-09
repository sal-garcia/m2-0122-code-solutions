const add = require('./add');
const divide = require('./divide');
const multiply = require('./multiply');
const subtract = require('./subtract');

if (process.argv[3] === 'plus') {
  console.log(add(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
} else if (process.argv[3] === 'divided by') {
  console.log(divide(parseFloat(process.argv[2]), parseFloat(process.argv[4])));
} else if (process.argv[3] === 'times') {
  console.log(multiply(parseInt(process.argv[2]), parseInt(process.argv[4])));
} else if (process.argv[3] === 'minus') {
  console.log(subtract(parseInt(process.argv[2]), parseInt(process.argv[4])));
}
