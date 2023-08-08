import { useContext } from "react";
import { useEffect } from "react";

import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";

import AppContext from "./context/AppContext";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage"
import AboutPage from "./pages/AboutPage";
import SharePage from "./pages/SharePage";

function App() {
    /* In AppContext.js:
            const [token, setToken] = useState();
        token === username
    */
    const {token, setToken} = useContext(AppContext);

    // useEffect: load the token from Cookies
    useEffect(() => {
        setToken(Cookies.get("token"));
    }, [setToken]);

    // onLogin, save the token in Cookies & setToken()
    const handleLogin = (token) => {
        Cookies.set("token", token, {
            expires: 10,
            sameSite: "strict",
        });
        setToken(token);
    }

    const handleLogout = (event) => {
        event.preventDefault();
        setToken(null);
    }
    

    if (!token) {
        return <LoginPage onLogin={handleLogin}/>
    }

    return (
        <div className="app">
            <HashRouter>
            {/* <div className="hero is-primary is-fullheight"> */}
                <nav className="nav shadow hero is-primary ">
                    <div className="container shadow">
                        { token ? 
                            <div className="columns">
                                    <h1 className="nav-item title column is-size-1">Welcome!!! {token} </h1>
                                    <button className="nav-item button is-primary column is-one-fifth text-center m-auto" onClick={handleLogout}>Switch User </button>
                            </div>
                                
                        :
                            ""
                        }
                    </div>
                </nav>
                
                <section className="main-content columns is-fullheight">
                    <aside className="column is-2 is-primary hero is-fullheight">
                        <div>
                            <p className="menu-label is-hidden-touch m-2">Navigation</p>
                            <ul className="menu-list">
                                <li>
                                    <Link to={"/"} className="is-size-5">Home</Link>
                                </li>
                                <li>
                                    <Link to={"/share"} className="is-size-5">Other's Favourite</Link>
                                </li>
                                <li>
                                    <Link to={"/about"} className="is-size-5">About</Link>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <div className="container column is-10">
                        <div className="section">
                            <Routes>
                                <Route path="/" element={<MainPage />} />
                                <Route path="/share" element={<SharePage />} />
                                <Route path="/about" element={<AboutPage />} />
                            </Routes>
                        </div>
                    </div>
                </section>

                
            </HashRouter>
        </div>

        
    )
}

export default App;