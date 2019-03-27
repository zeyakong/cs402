const MongoClient = require('mongodb').MongoClient;
let db;

// Connection URL
const url = 'mongodb://localhost:27017';
// database name
const dbName = 'hw3';
// Create a new MongoClient
let client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function (err) {
    if (err) throw err;
    db = client.db(dbName);
});

module.exports = {collection: (name) => db.collection(name)};