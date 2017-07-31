const { Strategy: LocalStrategy } = require('passport-local');
const { localAuth } = require('./../../auth-credentials.json');

localAuth.passReqToCallback = true;

const MESSAGES = {
    EXISTING_USERNAME: 'There is already user with same username!',
};

const init = (users) => {
    return new LocalStrategy(
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
                        role: 'admin',
                    };

                    return users.create(user)
                        .then((newUser) => done(null, newUser));
                }).catch((error) => {
                    done(null, false, req.flash('error', error));
                });
        });
};

module.exports = { init };
