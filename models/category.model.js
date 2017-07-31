class Category {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            model.name.length > 2 &&
            model.name.length <= 20 &&
            typeof model.summary === 'string' &&
            model.summary.length > 40 &&
            model.summary.length <= 1000 &&
            Array.isArray(model.algorithms);
    }

    get id() {
        return this._id;
    }
}

module.exports = Category;
