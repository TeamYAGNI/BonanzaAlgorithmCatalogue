const BaseData = require('./base');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
    }

    findByUsername(username) {
        const filter = {
            username: new RegExp(username, 'i'),
        };

        return this.collection.findOne(filter);
    }

    findOrCreate(profile) {
        console.log(profile);
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
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return user;
            });
    }
}

const getData = (db) => {
    return new UsersData(db);
};

module.exports = { getData };
