const express = require('express');
const config = require('./config/config');
// const glob = require('glob');

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/local';

mongoClient.connect(url, (error, db) => {
  db.collection('users').find({}).toArray((err, items) => {
    console.log(items);
    db.close();
  });
});

// Requiring all models
// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

const app = express();

const data = require('./app/data');

require('./config/auth')(app, data);
require('./config/express')(app, config);

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
