import React, { useState, useRef } from 'react'
import "../../App.css"
import SignupCss from './Signup.module.css';
import signUpimage from '../../images/team-image.jpg'
import { Authentication } from '../Firebase/Authentication';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const SignUp = () => {
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showpass, setShowpass] = useState(false)
    const passwordref = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        Authentication(email, password, history)
    }

    const showPassword = (e) => {
        // console.log(e.target.value);
        // console.log(passwordref.current.type);
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
            <form onSubmit={handleSubmit}>
                <section className="h-100">
                    <div className="container-fluid py-5">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col">
                                <div className="card card-registration my-4">
                                    <div className="row g-0">
                                        <div className="col-xl-6 d-none d-xl-block">
                                            <img src={signUpimage} alt="team Managment" className="img-fluid image-style" />
                                        </div>
                                        <div className="col-xl-6">
                                            <div className="card-body p-md-5 text-black">
                                                <h1
                                                    className="mb-5 text-capitalize d-flex justify-content-center text-muted fw-bold">
                                                    Team Managment
                                                </h1>
                                                <h3 className="mb-5 text-uppercase fw-bold">SignUp</h3>

                                                <div className="form-outline mb-4">
                                                    <input type="text" id="signupusername" name="username" value={username} onChange={(e) => setUsername(e.target.value)}
                                                        className="form-control rounded-0 form-control-lg" autoCapitalize="none" autoCorrect="off" required />
                                                    <label className="form-label" htmlFor="signupusername">Username</label>
                                                    <div className="alert alert-danger alert-dismissible fade show" id="alreadyusername" style={{ display: "none" }} role="alert">
                                                        Username Already Taken, Try another!
                                                    </div>
                                                    <div className="alert alert-danger alert-dismissible fade show" id="spaceusername" style={{ display: "none" }} role="alert">
                                                        Username Can not contain any space!
                                                    </div>
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <input type="text" id="signupfullname" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)}
                                                        className="form-control rounded-0 form-control-lg" autoCorrect="off" required />
                                                    <label className="form-label" htmlFor="signupfullname">Full name</label>
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input type="email" id="signupemailid" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                                        className="form-control rounded-0 form-control-lg" required />
                                                    <label className="form-label" htmlFor="signupemailid">Email ID</label>
                                                </div>

                                                <div className="form-outline mb-1">
                                                    <input ref={passwordref} type="password" id="signuppassword" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                                        className="form-control rounded-0 form-control-lg" required />
                                                    <label className="form-label" htmlFor="signuppassword">Password</label>
                                                </div>
                                                <div className="form-check form-switch">
                                                    <input className="form-check-input shadow-remove" type="checkbox"
                                                        id="flexSwitchCheckDefault" value={showpass} onChange={showPassword} />
                                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                                        Show Password</label>
                                                </div>
                                                <div id="emailHelp" className="form-text mb-4 text-center pt-4">
                                                    Already have an account <Link to="/login">Login here</Link>
                                                </div>

                                                <div className="d-flex justify-content-start pt-3">
                                                    <button type="submit"
                                                        className="btn btn-primary shadow-remove rounded-0 text-light btn-lg">
                                                        SignUp
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

export default SignUp;
