const BaseData = require('./base');

class CategoriesData extends BaseData {
    constructor(db, { Category }) {
        super(db, Category, Category);
    }

    findByName(name) {
        const filter = {
            name: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }

    updateByName(category) {
        return this.collection.updateOne({
            name: category.name,
        }, category);
    }
}

const getData = (db, models) => {
    return new CategoriesData(db, models);
};

module.exports = { getData };
