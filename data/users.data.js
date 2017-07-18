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
