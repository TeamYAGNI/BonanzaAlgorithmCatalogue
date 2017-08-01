const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const configJson = require('./config.json');
const session = require('express-session');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();

const init = (data, config) => {
    const env = configJson.NODE_ENV || 'development';
    if (env === 'test') {
        const admin = {
            firstName: 'administ',
            lastName: 'administ',
            username: 'admin3',
passHash: '4fc2b5673a201ad9b1fc03dcb346e1baad44351daa0503d5534b4dfdcc4332e0',
            email: 'administrator@administrator.com',
            profileImage: 'default-profile-picture',
            role: 'admin',
            tasks: {},
        };
        data.users.create(admin)
            .then(() => {
                const app = express();

                app.locals.ENV = env;
                app.locals.ENV_DEVELOPMENT = env === 'development';

                app.set('views', config.root + '/app/views');
                app.set('view engine', 'jade');

                app.use(favicon(config.root + '/public/img/favicon.ico'));
                app.use(logger('dev'));
                app.use(bodyParser.text());
                app.use(bodyParser.json());
                app.use(bodyParser.urlencoded({
                    extended: true,
                }));

                app.use(compress());
                app.use('/public', express.static(config.root + '/public'));
                app.use('/libs', express.static(config.root + '/node_modules'));
                app.use(methodOverride());

                app.use(cookieParser('test'));
                app.use(session({
                    secret: 'test',
                    store: new RedisStore({
                        host: 'localhost',
                        port: 6379,
                        client: client,
                        ttl: 30 * 24 * 60 * 60,
                    }),
                    saveUninitialized: true,
                    resave: true,
                }));

                const { passport, user } = require('./auth')(app, data);

                app.use(require('connect-flash')());
                app.use((req, res, next) => {
                    res.locals.messages = require('express-messages')(req, res);
                    next();
                });

                const controllers = require('../app/controllers')
                    .init(data, passport);

                require('../app/routers')
                    .attachTo(app, controllers, user);

                app.use((req, res, next) => {
                    const err = new Error('Not Found');
                    err.status = 404;
                    next(err);
                });

                if (app.get('env') === 'development') {
                    app.use((err, req, res, next) => {
                        res.status(err.status || 500);
                        res.render('error', {
                            message: err.message,
                            error: err,
                            title: 'error',
                        });
                    });
                }

                app.use((err, req, res, next) => {
                    res.status(err.status || 500);
                    res.render('error', {
                        message: err.message,
                        error: {},
                        title: 'error',
                    });
                });
                return Promise.resolve(app);
            });
    }
    const app = express();

    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';

    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.use(favicon(config.root + '/public/img/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.text());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(compress());
    app.use('/public', express.static(config.root + '/public'));
    app.use('/libs', express.static(config.root + '/node_modules'));
    app.use(methodOverride());

    app.use(cookieParser('test'));
    app.use(session({
        secret: 'test',
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            client: client,
            ttl: 30 * 24 * 60 * 60,
        }),
        saveUninitialized: true,
        resave: true,
    }));

    const { passport, user } = require('./auth')(app, data);

    app.use(require('connect-flash')());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        next();
    });

    const controllers = require('../app/controllers')
        .init(data, passport);

    require('../app/routers')
        .attachTo(app, controllers, user);

    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error',
            });
        });
    }

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error',
        });
    });

    return Promise.resolve(app);
};

module.exports = { init };
