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
                    You do not nave permission to: ` + action,
                });
            } else {
                res.send(
                    'Access Denied: You do not nave permission to: ' + action);
            }
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(user.middleware());

    user.use((req, action) => {
        return ((req.isAuthenticated() && action !== 'access admin page')
            ? true
            : false);
    });

    user.use((req) => {
        return (req.user.role === 'admin') ? true : false;
    });

    return {
        passport,
        user,
    };
};

module.exports = configAuth;


// //===============PASSPORT=================

// // Passport session setup.
// passport.serializeUser(function (user, done) {
//     console.log("serializing " + user.username);
//     done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//     console.log("deserializing " + obj);
//     // simulate an admin user
//     obj.role = obj.username == 'admin' ? 'admin' : 'user';
//     done(null, obj);
// });

// /* GET home page. */
// app.get('/', user.can('access home page'), function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });

// //displays our signup page
// app.get('/signin', function (req, res) {
//     res.render('signin');
// });

// //sends the request through our local signup strategy, and if successful takes     user to homepage, otherwise returns then to signin page
// app.post('/local-reg', passport.authenticate('local-signup', {
//     successRedirect: '/',
//     failureRedirect: '/signin'
// })
// );

// //sends the request through our local login/signin strategy, and if successful    takes user to homepage, otherwise returns then to signin page
// app.post('/login', passport.authenticate('local-signin', {
//     successRedirect: '/',
//     failureRedirect: '/signin'
// })
// );

// // Simple route middleware to ensure user is authenticated.
// app.use(function (req, res, next) {
//     if (req.isAuthenticated()) { return next(); }
//     req.session.error = 'Please sign in!';
//     res.redirect('/signin');
// });

// //logs user out of site, deleting them from the session, and returns to homepage
// app.get('/logout', function (req, res) {
//     var name = req.user.username;
//     console.log("LOGGIN OUT " + req.user.username)
//     req.logout();
//     res.redirect('/');
//     req.session.notice = "You have successfully been logged out " + name + "!";
// });

// app.get('/private', user.can('access private page'), function (req, res) {
//     res.render('private');
// });

// app.get('/admin', user.can('access admin page'), function (req, res) {
//     res.render('admin');
// });


// app.use('/users', users);

// ....


// module.exports = app;
