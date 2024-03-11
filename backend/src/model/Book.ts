import { Db, ObjectId } from "mongodb"
import { getDB } from "../database/database"; 

interface IBook {
    _id?: ObjectId;
    title: string;
    author: string;
    description: string;
}


class Book implements IBook {
    title: string
    author: string
    description: string


    constructor (title: string, author: string, description: string) {
        this.title = title
        this.author = author
        this.description = description
    }

    static async getBookById (id: string): Promise<IBook | null> {
        try {
            const db: Db = getDB()
            const _id = new ObjectId(id);
            return await db.collection("Book").findOne({"_id": _id}) as IBook
        } catch (error) {
            console.error(error)
            return null
        }
    }
}

export {
    Book
}