const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://zzh:doo1YnKEkXsFEojN@cluster0.o4yext9.mongodb.net/?retryWrites=true&w=majority";

let database;

async function connectDB() {
    try{
        const client = await MongoClient.connect(uri);
        database = client.db("reading-list");
        if (!database) {
            throw new Error("Failed to connect to atlas!");
        }
    } catch(error) {
        console.error(error);
    }
}

function getDB() {
    try {
        if (!database) {
            throw new Error("Failed to connect to the database!");
        }
    } catch(error) {
        console.error(error);
    }
    return database;
}

module.exports = {
    connectDB: connectDB,
    getDB: getDB,
};