const express = require('express');
const config = require('./config/config');
const app = express();

const data = require('./app/data');

require('./config/auth')(app, data);
require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
