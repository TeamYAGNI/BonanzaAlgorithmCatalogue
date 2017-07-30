const BaseData = require('./base');

class TasksData extends BaseData {
    constructor(db, { Task }) {
        super(db, Task, Task);
    }

    findByName(name) {
        const filter = {
            name: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }
}

const getData = (db, models) => {
    return new TasksData(db, models);
};

module.exports = { getData };
