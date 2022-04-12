const express = require('express');
const fs = require('fs');
const app = express();
const dataJson = require('./data.json');
app.use(express.json());

// get
app.get('/api/notes', (req, res) => { // receive array containing objects of data.Json
  const arr = [];
  for (const properties in dataJson.notes) {
    arr.push(dataJson.notes[properties]);
  }
  res.status(200).send(arr);
});
// get

// getById
app.get('/api/notes/:id', (req, res) => { // if client uses an id that is not positive
  if (req.params.id < 0) {
    const response400 = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(response400);
  } else if (!dataJson.notes[req.params.id]) { // if there is no note with the specified id
    const DoesNotExist = {
      error: 'id does not exist'
    };
    res.status(404).json(DoesNotExist);
  } else {
    res.status(200).json(dataJson.notes[req.params.id]);
  }
});

// getById

// post

app.post('/api/notes', (req, res) => {

  if (!req.body.content) { // if the client does not content property in the req.body
    const errMsg = {
      error: 'content is a required field'
    };
    res.status(400).send(errMsg);
  } else { // else it will increment the id and the assign the value of the req body to that new id proerty
    const id = dataJson.nextId;
    dataJson.nextId++;
    req.body.id = id;
    dataJson.notes[id] = req.body;

    const dataStringify = JSON.stringify(dataJson, null, 2);
    fs.writeFile('./data.json', dataStringify, function (err) { // it will write that new property into the data.json file
      if (err) { // if an error ocurred while writing todata.json
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).json(errMsg);
      } else { // if the note is succesfully recorded
        res.status(201).json(req.body);
      }
    });

  }

});

// post

// delete
app.delete('/api/notes/:id', (req, res) => {

  if (req.params.id < 0) { // if the client does not specify an id that is valid/positive
    const errMessage = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(errMessage);
  } else if (!dataJson.notes[req.params.id]) { // if the note does not exist
    const notFound = {
      error: 'cannot find note with id'
    };
    res.status(404).json(notFound);
  } else {
    delete dataJson.notes[req.params.id];// deletes property
    const dataStringify = JSON.stringify(dataJson, null, 2);
    fs.writeFile('data.json', dataStringify, err => { // else write to the file
      if (err) { // if an error ocurred while writing to data.json
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).send(errMsg);
      } else { // else if deletion  was succesful
        res.sendStatus(204);
      }
    });
  }
});
// delete

// put

app.put('/api/notes/:id', (req, res) => {

  if (req.params.id < 0) { // if the client does not specify a positive/valid id
    const errMsg = {
      error: 'id must be a positive integer'
    };
    res.status(400).json(errMsg);

  } else if (!dataJson.notes[req.params.id]) { // if the note does not exist
    const noteDoesNotExist = {
      error: 'cannot find note with id'
    };
    res.status(404).json(noteDoesNotExist);
  } else {
    dataJson.notes[req.params.id].content = req.body.content; // modifies the content

    const dataStringify = JSON.stringify(dataJson, null, 2);

    fs.writeFile('data.json', dataStringify, err => {
      if (err) { // if an error ocurred while writing to the file
        console.error(err);
        const errMsg = { error: 'An unexpected error occurred.' };
        res.status(500).send(errMsg);
      } else { // is the note was sucesfully updated
        res.status(200).send(dataJson.notes[req.params.id]);
      }
    });
  }
});
// put

// port
app.listen(3000, () => {

});
