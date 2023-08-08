import { useState } from "react";
import { createUserDB } from "../api/authAPI"
import User from "../model/User"

function SignupPage({ onSignup }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errMessage, setErrMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await createUserDB(new User(username, password));
        console.log("receiving response from [backend]...", response);
        if(response.data.successful === true){
            setErrMessage(null);
            onSignup();
        } else if (response.data.successful === false){
            setErrMessage(response.data.unsuccessfulType);
        } else {
            alert("Something unexpected happended!");
        }
    }

    return (
        <div className="hero is-primary is-fullheight">

            <div className="hero-body is-justify-content-center is-align-items-center columns">
                <div className="column is-one-third box">
                    <form className="is-align-items-center is-justify-content-center columns is-flex is-flex-direction-column " onSubmit={handleSubmit}>
                        <div className="column">
                            <h1 className="title is-3 has-text-black">Sign up</h1>
                        </div>
                        <label className="column label is-two-thirds">
                            <p>Choose username: </p>
                            <input className="input is-primary" type="text" onChange={(event) => setUsername(event.target.value)} />
                        </label>
                        <label className="column label is-two-thirds">
                            <p>Set password: </p>
                            <input className="input is-primary" type="text" onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <div className="column">
                            <button className="button is-primary">Confirm</button>
                        </div>
                        <div className="column">
                            {(errMessage) ? <p>{errMessage}</p> : ""} 
                        </div>
                    </form>
                    <div className="has-text-centered">
                        <p className="is-size-7"> Already have an account? <button onClick={onSignup} className="has-text-primary">Log in</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;