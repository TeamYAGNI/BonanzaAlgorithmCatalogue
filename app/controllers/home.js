var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  if (err) {
    return next(err);
  }
  
  res.render('index', {
    title: 'Generator-Express MVC',
  });
});
