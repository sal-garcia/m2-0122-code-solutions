const express = require('express');
const app = express();

let nextId = 1;
const grades = {};

const expressJson = express.json();
app.use(expressJson);

app.get('/api/grades', function (req, res) {
  const arr = [];
  for (const properties in grades) {
    arr.push(grades[properties]);
  }
  res.json(arr);
});

app.post('/api/grades', function (req, res) {
  grades[nextId] = {
    name: req.body.name,
    course: req.body.course,
    score: req.body.score,
    id: nextId++
  };

  res.status(201).json(grades[nextId]);
});

app.listen(3000);
