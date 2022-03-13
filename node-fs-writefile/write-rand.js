const fs = require('fs');

const randomNum = Math.random();

fs.writeFile('random.txt', randomNum.toString(), function (err) {
  if (err) {
    throw err;
  }

});
