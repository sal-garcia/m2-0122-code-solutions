const express = require('express');
const app = express();

app.use(function (req, res) {

  res.send('string example');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('app is listening on port 3000');
});
