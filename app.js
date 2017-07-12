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

const app = express();

app.get('/', function(req, res) {
  res.send("mekiq maina");
});

module.exports = require('./config/express')(app, config);

app.listen(config.port, function() {
  console.log('Express server listening on port ' + config.port);
});

