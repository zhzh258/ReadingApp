const bcryptjs = require("bcryptjs");
const db = require("../database/database")

// reading-list.user:
/*
    ObjectId(): uid
    username
    password(hashing)
*/
class User {
    constructor({username, password}) {
        this.username = username;
        this.password = password;
    }

    async encrypt() {
        const hashing = await bcryptjs.hash(this.password, 12)
        this.password = hashing;
    } 
    
    async verify() {
        try {
            const existingUser = await db.getDB().collection("users").findOne({username: this.username});
            // console.log("We find an existing user...", existingUser);
            if(!existingUser){
                return {
                    correct: false,
                    incorrectType: "No such User",
                }
            } 
    
            // const existingHashing = existingUser.password;
            const bcryptjsResult = await bcryptjs.compare(this.password, existingUser.password);
            if(bcryptjsResult === true){
                return {
                    correct: true,
                    incorrectType: null
                }
            } else{
                return {
                    correct: false,
                    incorrectType: "Wrong Password",
                }
            }
        } catch(error) {
            console.error(new Error("Error in User.verify()"));
        }
    }

    async create() {
        try {
            const existingUser = await db.getDB().collection("users").findOne({username: this.username});
            
            // console.log("We find an existing user...", existingUser);
            if(existingUser){
                return {
                    successful: false,
                    unsuccessfulType: "User Already Exists",
                }
            } else{
                // else: OK to create a new user in DB
                await this.encrypt();
                await db.getDB().collection("users").insertOne(this);
                return {
                    successful: true,
                    unsuccessfulType: null,
                }
            }
        } catch(error) {
            console.error(new Error("Error in User.create()"))
        }

    }

}

module.exports = User;