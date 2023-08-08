import { useContext, useState } from "react";
import BookEdit from "./BookEdit"
import BooksContext from "../context/AppContext";

function BookShow({book}) {
    const { deleteBookById } = useContext(BooksContext)
    const [showingEdit, setShowingEdit] = useState(false)
   
    const handleEditClick = (event) => {
        setShowingEdit(!showingEdit);
    }
    const handleDeleteClick = (event) => {
        deleteBookById(book.id);
    }

    const handleSubmit = () => {
        setShowingEdit(false);
    }

    const boxContent = showingEdit ? 
        <BookEdit book={book} onSubmit={handleSubmit} /> 
        : 
        <h3>{book.title}</h3>

    return (
        <div className="book-show">
            <img alt={book.title} src={`https://picsum.photos/seed/${book.id}/300/200`} />
            {boxContent}
            <div className="actions">
                <button className="edit" onClick={handleEditClick}>Edit</button>
                <button className="delete" onClick={handleDeleteClick}>Delete</button>
            </div>
        </div>
    )
}

export default BookShow;