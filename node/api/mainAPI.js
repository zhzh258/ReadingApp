const axios = require("axios");
const Book = require("../model/Book");
const { request } = require("express");



async function getBooksDB(req, res) {
    const username = req.params.username;

    try{
        var books = await Book.getAllByUsernameDB(username);
    } catch(error){
        console.error(error);
    }
    // console.log(`[backend] receiving request... req.params == ${req.params}`);
    // console.log(req.params);

    return res.json({
        books: books,
        message: "Successfully get books!",
        date: new Date(),
    });
}


async function createBookDB(req, res) {
    const username = req.body.username;
    const newTitle = req.body.newTitle;

    try{
        // console.log(`[backend] receiving request... req.body.username == ${username} req.body.newTitle == ${newTitle}`);
        var book = new Book(newTitle, username);
        
        var mongodbRes = await book.storeDB();
        var insertedId = mongodbRes.insertedId;
    } catch(error){
        console.error(error);
    }

    
    return res.json({
        newBook: {
            _id: insertedId,
            title: book.title,
            username: book.username,
        },
        message: "Successfully create book in DB!",
        date: new Date(),
    });
}



async function editBookByIdDB(req, res) {
    const bookID = req.params.bookID;
    const newTitle = req.body.newTitle;

    try{
        await Book.editTitleByIdDB(bookID, newTitle);
    } catch(error){
        console.error(error);
    }

    return res.json({
        newBook: {
            _id: bookID,
            title: newTitle
        },
        message: "Successfully edit book in DB!",
        date: new Date(),
    });
}



async function deleteBookByIdDB(req, res) {
    const bookID = req.params.bookID;

    try{
        await Book.deleteByIdDB(bookID);
    } catch(error){
        console.error(error);
    }

    return res.json({
        message: "Successfully delete book in DB!",
        date: new Date(),
    });
}



module.exports = {
    getBooksDB,
    createBookDB,
    editBookByIdDB,
    deleteBookByIdDB,
}