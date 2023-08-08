import axios from "axios";

const url = "http://127.0.0.1:4000/users"
const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

/*
http://localhost:4000/users/login  POST

    req.body: {
        user: {
            username
            password
        }
    }

    res: {
        bool correct,
        string incorrectType   (if correct == false) "No such user" || "Wrong password" || "Unknown error"
        message
        date
    }

*/
async function verifyUserDB(user) {
    const reqBody = {
        username: user.username,
        password: user.password,
    }
    console.log(`now sending request to ${url + "/login"}... user: ${user}`);

    let response;
    try {
        response = await axios.post(url + "/login", reqBody, config);
    } catch(error){
        console.error(error);
    }
    console.log(response);
    return response;
}


/*
    req.body: {
        user: {
            username
            password
        }
    }
    
    res: {
        bool succeessful,
        string unsuccessfulType     (if successful === false) "User already exists"
        message
        date
    }
*/
async function createUserDB(user) {
    const reqBody = {
        username: user.username,
        password: user.password,
    }
    console.log("now sending request to [backend]... user: ", user);

    let response;
    try {
        response = await axios.put(url + "/signup", reqBody, config);
    } catch(error){
        console.error(error);
    }
    return response;
}

export {
    verifyUserDB,
    createUserDB
}