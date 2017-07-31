const { Strategy: FacebookStrategy } = require('passport-facebook');
const { facebookAuth } = require('./../../auth-credentials.json');

facebookAuth.passReqToCallback = true;

const init = (users) => {
    return new FacebookStrategy(facebookAuth,
        (req, token, refreshToken, profile, done) => {
            return users.findOrCreate(profile)
                .then((user) => done(null, user))
                .catch((err) => done(err));
        });
};

module.exports = { init };


