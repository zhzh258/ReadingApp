import express, { Express } from "express";
import cors from "cors"
import authRouter from "./api/auth";
import { connectDB } from "./database/database"; // Assuming default export is not used

const port: number = 4000;
const app: Express = express();

app.use(cors())
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(authRouter);

connectDB()
    .then(() => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    })
    .catch((error: Error) => {
        console.log("Failed to connect to the database!");
        console.error(error);
    });
