const getController = ({ users }) => {
    const getUsers = (req, res) => {
        let { pattern, page, size } = req.query;
        pattern = pattern || '';
        page = +page || 1;
        size = +size || 10;

        const filter = {
            username: new RegExp('.*' + pattern + '.*', 'i'),
        };

        const proection = {
            _id: 1,
            username: 1,
            password: 0,
        };

        users
            .filterBy(filter, proection, (page - 1) * size, size)
            .then((result) => {
                res.send(result);
            });
    };

    const getProfile = (req, res) => {
        const username = req.params.username;
        users.findByUsername(username)
            .then((profile) => {
                const context = {
                    profile: profile,
                    user: req.user,
                };
                return res.render('user-profile', context);
            })
            .catch((err) => {
                req.flash('error', err.message);
                return res.status(404).redirect('/users');
            });
    };

    const getEditForm = (req, res, next) => {
        const username = req.params.username;
        const currentUserId = req.user._id.toString();

        users
            .findByUsername(username)
            .then(_checkIfFound)
            .catch((error) => {
                req.flash('error', error.message);
                return res.status(404).redirect('/users');
            })
            .then((foundUser) => _checkPermission(foundUser, currentUserId))
            .catch((error) => {
                req.flash('error', error.message);
                return res.status(405).redirect('/users');
            }).then((foundUser) => {
                const context = {
                    user: foundUser,
                };

                return res.render('profile', context);
            });
    };

    const editProfile = (req, res) => {
        const username = req.params.username;
        const currentUserId = req.user._id.toString();
        const oldPassHash = req.body.user.oldPassword;
        const newUser = {
            username: req.body.user.username,
            passHash: req.body.user.password,
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            profileImage: req.body.user.profileImage,
        };

        users
            .findByUsername(username)
            .then(_checkIfFound)
            .catch((error) => {
                return res.status(404).send(error.message);
            })
            .then((foundUser) => _checkPermission(foundUser, currentUserId))
            .catch((error) => {
                return res.status(405).send(error.message);
            }).then((foundUser) => _checkPassword(foundUser, oldPassHash))
            .catch((error) => {
                return res.status(401).send(error.message);
            }).then((foundUser) => {
                users.updateByUsername(newUser);
                res.status(200).send('Your Profile is updated!');
            });
    };

    const _checkIfFound = (foundUser) => {
        if (!foundUser) {
            throw new Error('There is no such user!');
        }
        return foundUser;
    };

    const _checkPermission = (foundUser, currentUserId) => {
        if (foundUser && (currentUserId !== foundUser._id.toString())) {
            throw new Error('You are not permitted to edit this profile!');
        }
        return foundUser;
    };

    const _checkPassword = (foundUser, oldPassHash) => {
        if (foundUser.passHash !== oldPassHash) {
            throw new Error('You should type the exact old password!');
        }
        return foundUser;
    };

    return {
        getUsers,
        getProfile,
        getEditForm,
        editProfile,
    };
};

module.exports = { getController };
