const express = require("express");
const mainAPI = require("./mainAPI")
const authAPI = require("./authAPI")

const router = express.Router();

router.post("/books/:username", mainAPI.getBooksDB);
router.post("/books", mainAPI.createBookDB);
router.put("/books/:bookID", mainAPI.editBookByIdDB);
router.delete("/books/:bookID", mainAPI.deleteBookByIdDB);

router.post("/users/login", authAPI.verifyUser);
router.put("/users/signup", authAPI.createUser);

module.exports = router;