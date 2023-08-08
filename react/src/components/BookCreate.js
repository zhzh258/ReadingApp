import { useContext, useState } from "react"
import BooksContext from "../context/AppContext";

function BookCreate() {
    const { createBook } = useContext(BooksContext);
    const [title, setTitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setTitle("")
        createBook(title);
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <div>
            <h2 className="is-size-3">Add a book</h2>
            <form onSubmit={handleSubmit}>
                <label>Book Title</label>
                <input className="input" value={title} onChange={handleChange}/>
                <button className="create">create!</button>
            </form>
        </div>
    )
}

export default BookCreate;