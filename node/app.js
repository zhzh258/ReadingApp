const express = require("express");
const router = require("./api/routes");
const bodyParser = require("body-parser");
const cors = require("cors")
const db = require("./database/database");

const port = 4000;

const app = express();
app.use(cors());
// app.use('/', express.static('../frontend/build'));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
//   });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(router);

db.connectDB()
    .then(function () {
        app.listen(port);
    })
    .catch(function (error) {
        console.log("Failed to connect to the database!");
        console.log(error);
    });