const mongodb = require("mongodb");
const db = require("../database/database");
// reading-list.book:
/*
    ObjectId(): BookID
    title
    user
*/


class Book {
    // title: string
    // user: User
    constructor(title, username) {
        this.title = title;
        this.username = username;
    }

    // getBooksDB
    static async getAllByUsernameDB(username) {
        try {
            return await db.getDB().collection("books").find({"username": username}).toArray();
        } catch(error) {
            console.error(error);
        }
    }

    // createBookDB
    async storeDB() {
        try {
            return await db.getDB().collection("books").insertOne(this);
        } catch(error) {
            console.error(error);
        }
    }

    // editBookByIdDB
    static async editTitleByIdDB(bookID, newTitle){
        try{
            const _id = new mongodb.ObjectId(bookID);
            await db.getDB().collection("books").updateOne({"_id": _id}, {$set : {title: newTitle}});
        } catch(error) {
            console.error(error);
        }
    }
    
    // deleteBookByIdDB
    static async deleteByIdDB(bookID){
        try{
            const _id = new mongodb.ObjectId(bookID);
            await db.getDB().collection("books").deleteOne({"_id": _id});
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = Book;