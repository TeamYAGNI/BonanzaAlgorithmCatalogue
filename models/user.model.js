class User {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.username === 'string' &&
            typeof model.password === 'string' &&
             model.password.length > 3 &&
            model.username.length > 3;
    }

    get id() {
        return this._id;
    }
}

module.exports = User;
