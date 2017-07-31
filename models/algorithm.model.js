class Algorithm {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            model.name.length > 2 &&
            model.name.length <= 30 &&
            typeof model.categoryName === 'string' &&
            model.categoryName.length > 2 &&
            model.categoryName.length <= 20 &&
            typeof model.note === 'string' &&
            model.note.length > 40 &&
            model.note.length <= 240 &&
            typeof model.article === 'string' &&
            model.article.length > 420;
    }

    get id() {
        return this._id;
    }
}

module.exports = Algorithm;
