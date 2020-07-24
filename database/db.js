const mongoDB = require('mongodb');
const mongoClient = mongoDB.MongoClient;
const mongoDBUrl = "Your mongodb url"

let _db;

const initDB = callback => {
    if (_db) {
        console.log('database already initialized');
        return callback(null, _db);
    }
    mongoClient.connect(mongoDBUrl).then(client => {
        _db = client;
        return callback(null, _db);
    })
        .catch(err => {
            callback(err);
        })
}

const getDB = () => {
    if (!_db) {
        throw Error('Database not initialized!')
    }
    return _db;
}

module.exports = { initDB, getDB }
