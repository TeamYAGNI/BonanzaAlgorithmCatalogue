const express = require('express');
const config = require('./config/config');
// const glob = require('glob');

const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://ec2-35-158-165-86.eu-central-1.compute.amazonaws.com:27017/local';

// Requiring all models
// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

const app = express();

const data = require('./app/data');

require('./config/auth')(app, data);
require('./config/express')(app, config);

app.get('/', function(req, res) {
  mongoClient.connect(url, (err, db) => {
    db.collection('users').find({}).toArray((err, items) => {
      if (err !== null) {
        res.send(err.message);
      } else {
        res.send(items);
      }
      db.close();
    });
  });
});

app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port);
});
