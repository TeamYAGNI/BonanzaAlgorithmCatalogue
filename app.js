const config = require('./config/config');

const async = () => {
    return Promise.resolve();
};

async()
    .then(() => require('./db').init(config.db))
    .then((db) => require('./data').init(db))
    .then((data) => require('./config/express').init(data, config))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Express server listening on port:${config.port}`));
    });
