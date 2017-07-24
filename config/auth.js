const cookieParser = require('cookie-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const client = redis.createClient();

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const {
    localAuth,
    facebookAuth,
    googleAuth,
    twitterAuth } = require('./auth-credentials.json');

localAuth.passReqToCallback = true;
facebookAuth.passReqToCallback = true;
googleAuth.passReqToCallback = true;
twitterAuth.passReqToCallback = true;

const configAuth = (app, { users }, passport) => {
    passport.use('local-login', new LocalStrategy(
        localAuth,
        (req, username, password, done) => {
            return users.checkPassword(username, password)
                .then((user) => done(null, user))
                .catch((error) => done(error));
        }
    ));

    passport.use('local-register', new LocalStrategy(
        localAuth,
        (req, username, password, done) => {
            if (req.user) {
                return done(null, req.user);
            }
            return users.findByUsername(username)
                .then((user) => {
                    if (user) {
                        return done(null, false);
                    }

                    user = req.body;

                    return users.create(user)
                        .then((newUser) => {
                            return done(null, newUser);
                        });
                }).catch((err) => done(err));
        }));

    passport.use('facebook-login',
        new FacebookStrategy(facebookAuth,
            (req, token, refreshToken, profile, done) => {
                return users.findOrCreate(profile)
                    .then((user) => done(null, user))
                    .catch((err) => done(err));
            }));

    passport.use('google-login',
        new GoogleStrategy(googleAuth,
            (req, token, tokenSecret, profile, done) => {
                console.log('opa');
                return users.findOrCreate(profile)
                    .then((user) => done(null, user))
                    .catch((err) => done(err));
            }));

    passport.use('twitter-login',
        new TwitterStrategy(twitterAuth,
            (req, token, refreshToken, profile, done) => {
                return users.findOrCreate(profile)
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
};

module.exports = configAuth;
