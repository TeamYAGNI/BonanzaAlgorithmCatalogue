class Task {
    static isValid(model) {
        console.log(model);
        return typeof model !== 'undefined' &&
            typeof model.name === 'string' &&
            Array.isArray(model.input) &&
            model.input.length > 0 &&
            Array.isArray(model.results) &&
            model.results.length === model.input.length
            &&
            typeof model.timelimit === 'string';
    }

    get id() {
        return this._id;
    }
}

module.exports = Task;
