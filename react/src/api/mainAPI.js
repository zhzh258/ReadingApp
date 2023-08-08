import axios from "axios"

const url = "http://127.0.0.1:4000/books"
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

  // NOTE!!!! axios.GET() does NOT allow passing data by req.body

/*
    req.params:
        username(token)

    res: {
        books,
        message,
        date
    }
*/
async function getBooksDB(token) {
    
    const reqBody = {
    }
    console.log(`now trying to get books... token == ${token}`)

    let response;
    try {
        response = await axios.post(`${url}/${token}`, reqBody, config);
    } catch(error) {
        console.error(error);
    }
    return response;
}


/*
    req.body:
        username
        newTitle

    res:{
        newBook,
        message,
        date
    }
*/
async function createBookDB(token, newTitle) {
    const reqBody = {
        username: token,
        newTitle: newTitle
    }
    // Compare with the axios.POST() here!
    console.log("now trying to create books... reqBody == ")
    console.log(reqBody);

    let response;
    try {
        response = await axios.post(url, reqBody, config);
    } catch(error) {
        console.error(error);
    }
    return response;
}

/*
    req.params:
        bookID
    
    req.body:
        newTitle

    res: {
        newBook,
        message,
        date
    }
*/
async function editBookByIdDB(bookID, newTitle) {
    const reqBody = {
        newTitle: newTitle
    }
    // 127.0.0.1/books/:bookID

    let response;
    try {
        response = await axios.put(`${url}/${bookID}`, reqBody, config);
    } catch(error) {
        console.error(error);
    }
    return response;
}


/*
    req.params:
        bookID
    
    res:
        NONE
*/
async function deleteBookByIdDB(bookID) {
    const reqBody = {
    }
    // 127.0.0.1/books/:bookID
    let response;
    try {
        response = await axios.delete(`${url}/${bookID}`, reqBody, config);
    } catch(error) {
        console.error(error);
    }
    return response;
}



export {
    getBooksDB,
    createBookDB,
    editBookByIdDB,
    deleteBookByIdDB,
}