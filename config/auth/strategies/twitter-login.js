const { Strategy: TwitterStrategy } = require('passport-twitter');
const { twitterAuth } = require('./../../auth-credentials.json');

twitterAuth.passReqToCallback = true;

const init = (users) => {
    return new TwitterStrategy(twitterAuth,
        (req, token, refreshToken, profile, done) => {
            return users.findOrCreate(profile)
                .then((user) => done(null, user))
                .catch((err) => done(err));
        });
};

module.exports = { init };
