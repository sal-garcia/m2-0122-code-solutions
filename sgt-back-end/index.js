const pg = require('pg');
const express = require('express');
const app = express();
const expressJsonMiddleware = express.json();
app.use(expressJsonMiddleware);
// only create ONE pool for your whole server
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

// get
app.get('/api/grades', function (req, res) {
  const sql = `
  select *
  from "grades" `;// gets all rows from th grades table
  db.query(sql).then(function (data) {
    const grades = data.rows;
    res.status(200).json(grades);// the query made was succesful

  }).catch(function (err) { // the query failed
    console.error(err);
    res.status(500).json({ error: 'An unexpected error ocurred' });
  });

});
// get

// post
app.post('/api/grades', function (req, res) {
  const name = req.body.name;
  const course = req.body.course;
  const score = req.body.score;

  if (!name) {
    return res.status(400).json({ error: 'name input is required' });
  } else if (!course) {
    return res.status(400).json({ error: 'course input is required' });
  } else if (!score) {
    return res.status(400).json({ error: 'score input is required' });
  } else if (isNaN(score) || score < 0 || score > 100) {
    return res.status(400).json({ error: 'score input is invalid' });
  }

  const sql = `
    insert into "grades"
    ("name","course","score")
    values
    ($1,$2,$3)
    returning * `;

  const params = [name, course, score];
  db.query(sql, params)
    .then(function (data) {
      const grade = data.rows[0];// assigning the result to grades to the top
      res.status(201).json(grade);// then parsing the result with json and passing it as a response
    })// along with status 201
    .catch(function (err) { // else if the query fails
      console.error(err);
      res.status(500).json({ error: 'An unexpected error ocurred' });
    });
});
// post
// put

app.put('/api/grades/:gradeId', function (req, res) {

  const name = req.body.name;// assigning request objesct to a variable
  const course = req.body.course;
  const score = req.body.score;
  const gradeId = req.params.gradeId;

  if (!name) { // checking that the client supplies valid values
    return res.status(400).json({ error: 'name input is required' });
  } else if (!course) {
    return res.status(400).json({ error: 'course input is required' });
  } else if (!score) {
    return res.status(400).json({ error: 'score input is required' });
  } else if (isNaN(score) || score < 0 || score > 100) {
    return res.status(400).json({ error: 'score input is invalid' });
  }

  const sql = `
  update "grades"
  set "name" = $1,
   "course" = $2,
  "score" = $3
  where "gradeId" = $4
  returning *
  `;

  const params = [name, course, score, gradeId];

  db.query(sql, params)
    .then(data => { // becuase the target grade may not exist
      const [grade] = data.rows;
      if (data.rowCount === 0) {
        return res.status(404).json({ error: 'Cannot find grade with gradeId' });
      }
      res.status(200).json(grade);// because the grade might be succesfully updated
    })
    .catch(err => {
      console.error(err);// if there is an error querying to the database
      res.status(500).json({ error: 'An unexpected error occurred' });
    });

});

// put
// delete

app.delete('/api/grades/:gradeId', function (req, res) {
  const gradeId = req.params.gradeId;

  if (gradeId < 0 || isNaN(gradeId)) { // if the gradeId is negative
    return res.status(400).json({ error: 'gradeId must be a positive integer' });
  }

  const sql = `
  delete from "grades"
    where "gradeId" = $1
    returning *
  `;

  const params = [gradeId];
  db.query(sql, params)
    .then(data => {
      if (data.rowCount === 0) { // iinvalid gradeId
        return res.status(404).json({ error: 'Cannot find grade with gradeId' });
      }
      res.sendStatus(204);
    })
    .catch(err => { // there was an error querying to the database
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred' });
    });

});

// delete

// port
app.listen(3000, function () {

});
// port
