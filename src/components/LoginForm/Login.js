import React, { useState, useRef, useEffect } from 'react'
import "../../App.css"
import LoginCss from "./Login.module.css"
import login from "../../images/login.jpg"
import { Link } from 'react-router-dom'
import { LoginAuth } from '../Firebase/Authentication'
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpass, setShowpass] = useState(false)
    const passwordref = useRef();

    const handleLogin = (e) => {
        e.preventDefault(); 
        LoginAuth(email, password, history);
    }

    const showPassword = (e) => {
        // console.log(e.target.value); console.log(passwordref.current.type);
        if (showpass === true) {
            setShowpass(false);
            passwordref.current.type = "password";
        } else if (showpass === false) {
            setShowpass(true);
            passwordref.current.type = "text";
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <section className="h-100">
                    <div className="container py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card card-registration my-4">
                                    <div className="row g-0">
                                        <div className="col-xl-6 d-none d-xl-block">
                                            <img src={login} alt="team Managment" className="img-fluid" style={{ borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem' }} />
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="card-body p-md-5 text-black">
                                                <h1 className="mb-5 text-capitalize d-flex justify-content-center text-muted fw-bold">
                                                    Team Managment</h1>
                                                <h3 className="mb-5 text-uppercase fw-bold">Login</h3>
                                                <div className="row">
                                                    <div className="form-outline mb-4">
                                                        <input type="text" name="Email" className="form-control rounded-0 form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                                        <label className="form-label" htmlFor="loginnameoremail">Username or Email
                                                            address</label>
                                                    </div>
                                                </div>
                                                <div className="form-outline mb-1">
                                                    <input ref={passwordref} type="password" name="Password" className="form-control rounded-0 form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                                    <label className="form-label" htmlFor="loginpassword">Password</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input shadow-remove" type="checkbox" value={showpass} onChange={showPassword} id="flexSwitchCheckDefault" />
                                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show
                                                        Password</label>
                                                </div>
                                                <div id="emailHelp" className="form-text mb-4 text-center pt-4">
                                                    Dont have an account <Link to="/">Signup here</Link>
                                                </div>
                                                <div className="d-flex justify-content-start pt-3">
                                                    <button type="submit" className="btn btn-primary shadow-remove rounded-0 text-light btn-lg">
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>

        </div>
    )
}

export default Login
