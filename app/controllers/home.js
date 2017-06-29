const { Router } = require('express');
const router = new Router();

module.exports = (app) => {
  app.use('/', router);
};
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Generator-Express MVC',
  });
});
