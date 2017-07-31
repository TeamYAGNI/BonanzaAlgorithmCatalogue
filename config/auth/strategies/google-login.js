const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const { googleAuth } = require('./../../auth-credentials.json');

googleAuth.passReqToCallback = true;

const init = (users) => {
    return new GoogleStrategy(googleAuth,
        (req, token, tokenSecret, profile, done) => {
            return users.findOrCreate(profile)
                .then((user) => done(null, user))
                .catch((err) => done(err));
        });
};

module.exports = { init };
