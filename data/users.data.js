const BaseData = require('./base');

class UsersData extends BaseData {
    constructor(db, { User }) {
        super(db, User, User);
    }

    findByUsername(username) {
        const filter = {
            username: new RegExp(username, 'i'),
        };

        return this.collection.findOne(filter);
    }

    findOrCreate(profile) {
        const user = {
            username: profile.displayName,
            password: profile.id,
        };

        return this.findByUsername(user.username)
            .then((dbUser) => {
                if (dbUser !== null) {
                    return dbUser;
                }

                return this.collection.insert(user)
                    .then(() => {
                        return this.findByUsername(user.username);
                    });
            });
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return Promise.reject('Invalid user');
                }

                if (user.passHash !== password) {
                    return Promise.reject('Invalid password');
                }

                return user;
            });
    }

    updateByUsername(user) {
        return this.collection.updateOne({
            username: user.username,
        }, user);
    }
}

const getData = (db, models) => {
    return new UsersData(db, models);
};

module.exports = { getData };
