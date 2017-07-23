const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { facebookAuth } = require('./auth-credentials.json');

const configAuth = (app, { users }) => {
    passport.use('local', new LocalStrategy(
        (username, password, done) => {
            return users.checkPassword(username, password)
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    passport.use('facebook', new FacebookStrategy(facebookAuth, (accessToken, refreshToken, profile, done) => {
            return users.findOrCreate(profile)
            .then((user) => {
                console.log(user);
                return user;
            })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    }));

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
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                done(null, user);
            })
            .catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };
        next();
    });
};

module.exports = configAuth;
