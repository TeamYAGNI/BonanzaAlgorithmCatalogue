const { MongoClient, ObjectID } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Databases connected');
            db.getId = (id) => new ObjectID(id);
            return db;
        });
};

module.exports = { init };
