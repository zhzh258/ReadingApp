import { useContext, useState } from "react";
import AppContext from "../context/AppContext";

function BookEdit({ book, onSubmit }) {
    const { editBookById } = useContext(AppContext);
    const [title, setTitle] = useState(book.title);


    const handleSubmit = (event) => {
        event.preventDefault();
        const id = book.id;
        const newTitle = title; // state_title
        editBookById(id, newTitle)
        onSubmit(); // set ShowingEdit := false
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>New Title:</label>
            <input className="input" value={title} onChange={handleChange}></input>
            <button className="button">Save</button>
        </form>
    )
}

export default BookEdit;