import { Router } from "express";
import { User, VerifyUserResponse, CreateUserResponse } from "../model/User";

const router = Router();

router.post("/user/login", async (req, res) => {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid req.body types' });
    }
    
    try {
        const hashing: string = await User.encrypt(password);
        const user = new User(username, hashing);
        const verifyRes: VerifyUserResponse = await user.verifyUser(password);
        return res.status(200).json(verifyRes)
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            correct: false,
            incorrectType: "Error occurred verifying user"
        })
    }
})

router.post("/user/signup", async (req, res) => {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string') {
        return res.status(400).json({ message: 'Invalid req.body types' });
    }
    
    try {
        const hashing: string = await User.encrypt(password);
        const user = new User(username, hashing);
        const createRes: CreateUserResponse = await user.createUser();
        return res.status(200).json(createRes)
    } catch (error) {
        return res.status(500).json({
            correct: false,
            incorrectType: "Error occurred creating user"
        })
    }
})


export default router;