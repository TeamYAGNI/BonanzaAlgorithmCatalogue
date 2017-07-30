const config = require('./config/config');
const models = require('./models').init();

const async = () => {
    return Promise.resolve();
};

async()
    .then(() => require('./db').init(config.db))
    .then((db) => require('./data').init(db, models))
    .then((data) => require('./config/express').init(data, config))
    .then((app) => {
       return app.listen(config.port, () =>
            console.log(`Express server listening on port:${config.port}`));
    })
    .then((server) => require('./config/socket').init(server));
