const express = require('express');
const app = express();

const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

app.get('/api/grades', function (req, res) {
  const arr = [];
  for (const properties in grades) {
    arr.push(grades[properties]);
  }
  res.json(arr);
});

app.delete('/api/grades/:id', function (req, res) {
  const arr = [];
  for (const properties in grades) {
    if (properties === req.params.id) {
      delete grades[properties];
      return res.sendStatus(204);
    } else {
      arr.push(grades[properties]);
    }
  }
  res.json(arr);

});

app.listen(3000);
