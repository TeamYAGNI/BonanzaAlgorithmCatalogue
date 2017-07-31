const BaseData = require('./base');

class AlgorithmsData extends BaseData {
    constructor(db, { Algorithm }) {
        super(db, Algorithm, Algorithm);
    }

    findByName(name) {
        const filter = {
            username: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }
}

const getData = (db, models) => {
    return new AlgorithmsData(db, models);
};

module.exports = { getData };
