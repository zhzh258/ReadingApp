import { MongoClient, Db } from "mongodb";
const uri = "mongodb+srv://nonox530042:VcW2CvUrBgmns7Tw@cluster0.l2uji1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
let database: Db | null = null;

async function connectDB(): Promise<void> {
    try {
        const client: MongoClient = await MongoClient.connect(uri);
        const db: Db = client.db("readingApp");
        if (!db) {
            throw new Error("Failed to connect to atlas!");
        }
        database = db;
    } catch (error) {
        console.error(error);
    }
}

function getDB(): Db {
    if (!database) {
        throw new Error("Failed to connect to the database!");
    }
    return database;
}

export { connectDB, getDB };