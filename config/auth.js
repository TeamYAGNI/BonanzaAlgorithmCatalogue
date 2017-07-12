const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();
const { Strategy } = require('passport-local');

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    if (user.password !== password) {
                        done(new Error('Invalid password'));
                    }
                    return done(null, user);
                })
                .catch((error) => {
                    return done(error);
                });
        }
    ));

    app.use(cookieParser('test'));
    app.use(session({
        secret: 'test',
        store: new RedisStore({
            host: 'localhost',
            port: 6379,
            client: client,
            ttl: 900,
        }),
        saveUninitialized: true,
        resave: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;
