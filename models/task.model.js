class Task {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            Array.isArray(model.input) &&
            model.input.length > 0 &&
            Array.isArray(model.results) &&
            model.results.length === model.input.length &&
            typeof model.timelimit === 'string' &&
            typeof model.description === 'string' &&
            typeof model.memorylimit === 'string';
    }

    get id() {
        return this._id;
    }
}

module.exports = Task;
