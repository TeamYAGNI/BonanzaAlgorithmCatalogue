const BaseData = require('./base');

class CategoriesData extends BaseData {
    constructor(db, { Category, Algorithm }) {
        super(db, Category, Category);
    }

    findByName(name) {
        const filter = {
            username: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }

    removeAlgorithm(categoryName, algorithmName){
        this.findByName(categoryName)
            .then((categoryFound) => {
                if (!categoryFound) {
                    return Promise.reject('There is no such category!');
                }

                categoryFound.algorithms.push(Algorithm);

                return this.updateByName(categoryFound);
            });
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
