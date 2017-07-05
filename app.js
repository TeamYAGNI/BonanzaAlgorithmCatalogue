let express = require('express'),
    config = require('./config/config'),
    glob = require('glob');

const mongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/local';

mongoClient.connect(url, (err, db) => {
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

module.exports = require('./config/express')(app, config);

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

