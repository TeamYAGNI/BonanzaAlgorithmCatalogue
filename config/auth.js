const passport = require('passport');

const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: FacebookStrategy } = require('passport-facebook');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { Strategy: TwitterStrategy } = require('passport-twitter');

const MESSAGES = {
    EXISTING_USERNAME: 'There is already user with same username!',
};

const {
    localAuth,
    facebookAuth,
    googleAuth,
    twitterAuth } = require('./auth-credentials.json');

localAuth.passReqToCallback = true;
facebookAuth.passReqToCallback = true;
googleAuth.passReqToCallback = true;
twitterAuth.passReqToCallback = true;

const configAuth = (app, { users }) => {
    passport.use('local-login', new LocalStrategy(
        localAuth,
        (req, username, password, done) => {
            return users.checkPassword(username, password)
                .then((user) => done(null, user))
                .catch((error) => done(null, false, req.flash('error', error)));
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
                        return done(
                            null,
                            false,
                            req.flash('error', MESSAGES.EXISTING_USERNAME));
                    }

                    user = {
                        firstName: req.body['first-name'],
                        lastName: req.body['last-name'],
                        username: req.body.username,
                        passHash: req.body.password,
                        email: req.body['e-mail'],
                        profileImage: req.body['image-id'],
                        tasks: {},
                    };

                    return users.create(user)
                        .then((newUser) => done(null, newUser));
                }).catch((error) => {
                    done(null, false, req.flash('error', error));
                });
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

    return passport;
};

module.exports = configAuth;
