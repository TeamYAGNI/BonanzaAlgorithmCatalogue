const { Strategy: LocalStrategy } = require('passport-local');
const { localAuth } = require('./../../auth-credentials.json');

localAuth.passReqToCallback = true;

const init = (users) => {
    return new LocalStrategy(
        localAuth,
        (req, username, password, done) => {
            return users.checkPassword(username, password)
                .then((user) => done(null, user))
                .catch((error) => done(null, false, req.flash('error', error)));
        }
    );
};

module.exports = { init };
