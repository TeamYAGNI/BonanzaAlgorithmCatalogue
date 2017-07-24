const BaseData = require('./base');
const Task = require('../models/task.model');

class TasksData extends BaseData {
    constructor(db) {
        super(db, Task, Task);
    }

    findByName(name) {
        const filter = {
            name: new RegExp(name, 'i'),
        };

        return this.collection.findOne(filter);
    }
}

const getData = (db) => {
    return new TasksData(db);
};

module.exports = { getData };
