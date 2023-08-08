import { createContext } from "react";
import { useState, useCallback } from "react";
import * as mainAPI from "../api/mainAPI"
import Book from "../model/Book"

const AppContext = createContext();

/*  MEMBER VARIABLES:
        token,
        books

    MEMBER FUNCTIONS:
        setToken,
        CRUD for books
*/

/*
    books: Array([book1, book2, ...])

    book {
        book.id
        book.title
        book.username
    }
*/


function Provider({children}) {
    const [token, setToken] = useState();

    const [books, setBooks] = useState([])
    console.log(`rerendering AppContext... Token == ${token}`)

    // do NOT export this function
    const initBooks_unstable = () => {
        console.log(`initBooks_unstable(): token == ${token}`)
        
        async function fetchData(token) {
            console.log(`fetchData(): token == ${token}`)
            try{
                const response = await mainAPI.getBooksDB(token);
                const books = response.data.books.map((book, index) => {
                    return new Book(book._id, book.title, book.username);
                })
                console.log("now fetching books...")
                console.log(books);
                setBooks(books);
            } catch(error){
                console.error(new Error("Error in initBooks(). Probably back-end error."));
            }
        }
        // initialize the state
        fetchData(token);
    }

    // export this one. 
    // It's address never changes when Provider rerendered
    const initBooks = useCallback(initBooks_unstable, [token]);


    const createBook = async (newTitle) => {
        try {
            // create book in database
            const response = await mainAPI.createBookDB(token, newTitle);
            const newBook = new Book(
                response.data.newBook._id,
                response.data.newBook.title,
                token
            );
    
            // create book in state
            setBooks([...books, newBook])
            return response;
        } catch(error) {
            console.error(new Error("Error in createBook(). Probably back-end error."));
        }
    }

    const deleteBookById = async (id) => {
        // delete book in database
        mainAPI.deleteBookByIdDB(id);
        // delete book in state
        setBooks(books.filter(function(book) {
            return book.id !== id;
        }))
    }

    const editBookById = async(id, newTitle) => {
        try {
            // edit book in database
            const response = await mainAPI.editBookByIdDB(id, newTitle);
            const newBook = new Book(
                response.data.newBook._id,
                response.data.newBook.title,
                token,
            );
    
            // edit book in state
            setBooks(books.map((book, index) => {
                if(book.id !== id){ // other book
                    return book;
                }
                else{ // modified book
                    return { ...book, ...newBook };
                }
            }))
        } catch(error) {
            console.error(new Error("Error in editBookById(). Probably back-end error."));
        }
    }

    const appState = {
        token,
        setToken,

        books,
        initBooks,
        createBook,
        deleteBookById,
        editBookById
    }
    
    return (
        <AppContext.Provider value={appState}>
            {children}
        </AppContext.Provider>
    )
}

export {Provider}
export default AppContext;