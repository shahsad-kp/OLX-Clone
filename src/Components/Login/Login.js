import React, {useContext, useEffect, useRef} from 'react';
import {signInWithEmailAndPassword} from 'firebase/auth';

import Logo from '../../olx-logo.png';
import './Login.css';
import {AuthContext, FirebaseContext} from "../../store/FirebaseContext";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const {auth} = useContext(FirebaseContext);
    const {user} = useContext(AuthContext);

    const navigator = useNavigate();

    useEffect(() => {
        if (user){
            navigator('/');
        }
    },  [user])

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            navigator('/');
        }).catch(
            (error) => alert(error.message)
        );
    }

    return (
        <div>
            <div className="loginParentDiv">
                <img width="200px" height="200px" src={Logo} alt={'logo'}/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="fname">Email</label>
                    <br/>
                    <input
                        className="input"
                        type="email"
                        id="fname"
                        name="email"
                        defaultValue="John"
                        ref={emailRef}
                    />
                    <br/>
                    <label htmlFor="lname">Password</label>
                    <br/>
                    <input
                        className="input"
                        type="password"
                        id="lname"
                        name="password"
                        defaultValue="Doe"
                        ref={passwordRef}
                    />
                    <br/>
                    <br/>
                    <button>Login</button>
                </form>
                <Link to={'/signup'}>Signup</Link>
            </div>
        </div>
    );
}

export default Login;
