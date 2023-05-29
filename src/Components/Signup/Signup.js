import React, {useContext, useEffect, useRef} from 'react';
import {updateProfile} from 'firebase/auth';
import {doc, setDoc} from "firebase/firestore";

import Logo from '../../olx-logo.png';
import './Signup.css';
import {createUserWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext, FirebaseContext} from "../../store/FirebaseContext";

export default function Signup() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();

    const navigator = useNavigate();
    const {firestore, auth} = useContext(FirebaseContext);
    const {user} = useContext(AuthContext);

    useEffect(() =>{
        if (user){
            navigator('/')
        }
    }, [user])

    const handleSubmit = (event) => {
        event.preventDefault()
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                updateProfile(auth.currentUser, {displayName: username}).then(() => {
                    const data = {
                        username: username,
                        phone: phone
                    }
                    setDoc(doc(firestore, "users", auth.currentUser.uid), data).then(
                        r => navigator('/login/')
                    ).catch(
                        (reason) => alert(reason.message)
                    );

                })
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });

    }

    return (<div>
        <div className="signupParentDiv">
            <img width="200px" height="200px" src={Logo} alt={'logo'}></img>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fname">Username</label>
                <br/>
                <input
                    className="input"
                    type="text"
                    id="fname"
                    name="name"
                    defaultValue="John"
                    ref={usernameRef}
                />
                <br/>
                <label htmlFor="fname">Email</label>
                <br/>
                <input
                    className="input"
                    type="email"
                    id="email"
                    name="email"
                    defaultValue="John"
                    ref={emailRef}
                />
                <br/>
                <label htmlFor="lname">Phone</label>
                <br/>
                <input
                    className="input"
                    type="number"
                    id="phone"
                    name="phone"
                    defaultValue="Doe"
                    ref={phoneRef}
                />
                <br/>
                <label htmlFor="lname">Password</label>
                <br/>
                <input
                    className="input"
                    type="password"
                    id="password"
                    name="password"
                    defaultValue="Doe"
                    ref={passwordRef}
                />
                <br/>
                <br/>
                <button>Signup</button>
            </form>
            <Link to={'/login'}>Login</Link>
        </div>
    </div>);
}
