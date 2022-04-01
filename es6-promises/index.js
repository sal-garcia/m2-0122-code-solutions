const takeAChance = require('./take-a-chance');

const myName = takeAChance('sal');
myName.then(response => {
  console.log(response);
});

myName.catch(error => {
  console.log(error.message);
});
