const expressPackage = require('express');
const app = expressPackage();
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
