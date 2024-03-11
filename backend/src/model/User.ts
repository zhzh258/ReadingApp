import { Db, ObjectId } from "mongodb"
import { getDB } from "../database/database"; 
import * as bcryptjs from "bcryptjs"



interface IUser {
    _id?: ObjectId;
    username: string;
    passwordHash: string;
}

interface VerifyUserResponse {
    correct: boolean;
    incorrectType: string | null;
}

interface CreateUserResponse {
    successful: boolean;
    unsuccessfulType: string | null;
}

class User implements IUser {
    username: string;
    passwordHash: string;

    constructor (username: string, passwordHash: string) {
        this.username = username;
        this.passwordHash = passwordHash;
    }

    static async encrypt(password: string): Promise<string> {
        return await bcryptjs.hash(password, 12);
    }

    async verifyUser(password: string): Promise<VerifyUserResponse> {
        try {
            const db: Db = getDB();
            const existingUser: IUser | null = await db.collection("User").findOne({username: this.username}) as IUser | null;
            if (existingUser == null) { // This username is not found
                return {
                    correct: false,
                    incorrectType: "No such user"
                };
            } else { // username found in database
                const bcriptjsResult = await bcryptjs.compare(password, existingUser.passwordHash);
                if (bcriptjsResult == true) { // Correct password
                    return {
                        correct: true,
                        incorrectType: null
                    };
                } else { // Wrong password
                    return {
                        correct: false,
                        incorrectType: "Wrong password"
                    };
                }
            }

        } catch (error) {
            console.error(error);
            return {
                correct: false,
                incorrectType: "Error occurred verifying user"
            };
        }
    }

    async createUser(): Promise<CreateUserResponse> {
        try {
            const db: Db = getDB();
            const existingUser: IUser | null = await db.collection("User").findOne({username: this.username}) as IUser | null;

            if (existingUser != null) { // This username is occupied 
                return {
                    successful: false,
                    unsuccessfulType: "User already exists"
                };
            } else { // This username is available
                await db.collection("User").insertOne(this);
                return {
                    successful: true,
                    unsuccessfulType: null
                };
            }
        } catch (error) {
            console.error(error);
            return {
                successful: false,
                unsuccessfulType: "Error occurred creating user"
            };
        }
    }
}

export {
    User,
    VerifyUserResponse,
    CreateUserResponse
}