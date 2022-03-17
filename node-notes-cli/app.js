const fs = require('fs');
const dataJson = require('./data.json');
const nextId = dataJson.nextId;

if (process.argv[2] === 'read') {
  for (const properties in dataJson.notes) {
    console.log(`${properties}: ${dataJson.notes[properties]}`);
  }
} else if (process.argv[2] === 'create') {
  dataJson.notes[nextId] = process.argv[3];// assigning value to property
  dataJson.nextId++;
} else if (process.argv[2] === 'update' && dataJson.notes[process.argv[3]] && process.argv[4]) { // checks that argument is truthy for whats going to be update and that there is something to be updated
  dataJson.notes[process.argv[3]] = process.argv[4];
} else if (process.argv[2] === 'delete' && dataJson.notes[process.argv[3]]) { // if its a truthy value
  delete dataJson.notes[process.argv[3]];
}

fs.writeFile('data.json', JSON.stringify(dataJson, null, 2), function (err) { // writes in data.json file
  if (err) {
    console.error(err);
  }
});
