import {useEffect, useContext} from "react"
import BookCreate from "../components/BookCreate"
import BookList from "../components/BookList"
import BooksContext from '../context/AppContext'


function MainPage() {
    const { initBooks } = useContext(BooksContext);
    useEffect(initBooks, [initBooks])

    return (
        <div>
            <h1>My Reading List</h1>
            <BookCreate/>
            <BookList/>
        </div>
    )
}

export default MainPage;