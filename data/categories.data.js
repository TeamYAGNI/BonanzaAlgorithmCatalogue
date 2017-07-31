const BaseData = require('./base');

class CategoriesData extends BaseData {
    constructor(db, { Category }) {
        super(db, Category, Category);
    }

    findByName(name) {
        const filter = {
            username: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }
}

const getData = (db, models) => {
    return new CategoriesData(db, models);
};

module.exports = { getData };
