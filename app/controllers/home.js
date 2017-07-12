const { Router } = require('express');

const attach = (app) => {
  const router = new Router();

  router.get('/', (req, res, next) => {
    res.render('index', {
      title: 'Generator-Express MVC',
    });
  });

  app.use('/', router);
};

module.exports = attach;
