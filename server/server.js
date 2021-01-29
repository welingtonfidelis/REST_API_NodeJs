const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

app.use('/', require('./route/postsRoute'));

app.listen(port, () => {
  console.log(`🚀 Server running in ${port}\n`);
});