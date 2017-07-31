const passport = require('passport');

const ConnectRoles = require('connect-roles');

const configAuth = (app, { users }) => {
    passport.use('local-login', require('./strategies/local-login')
        .init(users));
    passport.use('local-register', require('./strategies/local-register')
        .init(users));
    passport.use('facebook-login', require('./strategies/facebook-login')
        .init(users));
    passport.use('google-login', require('./strategies/google-login')
        .init(users));
    passport.use('twitter-login', require('./strategies/twitter-login')
        .init(users));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return users.findById(user._id)
            .then((foundUser) => {
                done(null, foundUser);
            })
            .catch(done);
    });

    const user = new ConnectRoles({
        failureHandler: (req, res, action) => {
            const accept = req.headers.accept || '';
            res.status(403);
            if (~accept.indexOf('html')) {
                res.render('error', {
                    error: {
                        status: 403,
                    },
                    message: `Access Denied: 
                    You do not have permission to: ` + action,
                });
            } else {
                res.send(
                    'Access Denied: You do not have permission to: ' + action);
            }
        },
    });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(user.middleware());

    user.use((req, res) => {
        return (req.user && req.user.role === 'admin') ? true : false;
    });

    return {
        passport,
        user,
    };
};

module.exports = configAuth;
