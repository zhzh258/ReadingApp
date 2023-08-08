
import BookShow from './BookShow'
import BooksContext from '../context/AppContext'
import { useContext } from 'react'

function BookList() {
    const { books } = useContext(BooksContext);
    
    const renderedBooks = books.map(function(book) {
        return <BookShow key={book.id} book={book}/>
    })

    return (
        <div>
            <div className="book-list">
                {renderedBooks}
            </div>
        </div>
    )
}

export default BookList;