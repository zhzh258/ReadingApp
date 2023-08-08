import { useState } from "react";
import { verifyUserDB } from "../api/authAPI"
import User from "../model/User"
import SignupPage from "./SignupPage";

function LoginPage({ onLogin }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errMessage, setErrMessage] = useState(null);

    const [signuping, setSignuping] = useState(false);

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await verifyUserDB(new User(username, password));
            console.log("receiving response from [backend]...", response);
            if(response.data.correct === true){
                setErrMessage(null);
                onLogin(username);
            } else if (response.data.correct === false){
                setErrMessage(response.data.incorrectType);
            } else {
                alert("Something unexpected happended!");
            }
        } catch(error) {
            console.error(error);
        }
    }

    console.log(`now rendering loginPage.js... signuping === `, signuping);

    if(signuping === true){
        return <SignupPage onSignup={() => {setSignuping(false);}}/>;
    }

    return (
        <div className="hero is-primary is-fullheight">

            <div className="hero-body is-justify-content-center is-align-items-center columns">
                <div className="column is-one-third box">
                    <form className="is-align-items-center is-justify-content-center columns is-flex is-flex-direction-column " onSubmit={handleSubmit}>
                        <div className="column">
                            <h1 className="title is-3 has-text-black">Log in</h1>
                        </div>
                        <label className="column label is-two-thirds">
                            <p>Your username: </p>
                            <input className="input is-primary" type="text" placeholder="visitor" onChange={(event) => setUsername(event.target.value)} />
                        </label>
                        <label className="column label is-two-thirds">
                            <p>Your password: </p>
                            <input className="input is-primary" type="text" placeholder="123456" onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <div className="column">
                            <button className="button is-primary">Go</button>
                        </div>
                        <div className="column">
                            {(errMessage) ? <p>{errMessage}</p> : ""} 
                        </div>
                    </form>
                    <div className="has-text-centered">
                        <p className="is-size-7"> Don't have an account? <button className="has-text-primary" onClick={() => {setSignuping(true);}}>Sign up</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;