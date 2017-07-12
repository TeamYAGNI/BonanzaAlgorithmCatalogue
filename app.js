let express = require('express'),
    config = require('./config/config');

// Connection to mongoose
//   mongoose = require('mongoose');
// mongoose.connect(config.db);
// var db = mongoose.connection;
// db.on('error', function () {
//   throw new Error('unable to connect to database at ' + config.db);
// });

// Requiring all models
// var models = glob.sync(config.root + '/app/models/*.js');
// models.forEach(function (model) {
//   require(model);
// });

const mongoClient = require('mongodb').MongoClient,
    //url = 'mongodb://localhost:27017/local'; 
    url = 'mongodb://ec2-35-158-165-86.eu-central-1.compute.amazonaws.com:27017/local';



const app = express();

app.get('/', function(req, res) {
  
  mongoClient.connect(url, (err, db) => {
    db.collection('users').find({}).toArray((err, items) => {
      if (err !== null) {
        res.send(err.message);
      }
      else {
        res.send(items);
      }
      db.close();
    });
  });

});

module.exports = require('./config/express')(app, config);

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

