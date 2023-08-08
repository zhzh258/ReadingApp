const axios = require("axios");
const User = require("../model/User");
const { request } = require("express");



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
async function verifyUser(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    // console.log("[backend] now receiving frontend request... req.body: ", req.body)

    try {
        var { correct, incorrectType } = await user.verify();
    } catch(error) {
        console.error(error);
    }
    // console.log("correct? ", correct);
    // console.log("incorrectType? ", incorrectType);


    return res.json({
        correct,
        incorrectType,
        message: "User verification completed!",
        date: new Date(),
    })
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
        string unsuccessfulType     (if successful === false) "User already exists"Y
        message
        date
    }
*/
async function createUser(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    try {
        var { successful, unsuccessfulType } = await user.create();
    } catch(error) {
        console.error(error);
    }
    return res.json({
        successful,
        unsuccessfulType,
        message: "User verification completed!",
        date: new Date(),
    })
}

module.exports = {
    verifyUser,
    createUser,
}