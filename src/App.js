import React, {useContext, useEffect} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import {AuthContext} from "./store/FirebaseContext";
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from './firebase/config'
import CreatePage from "./Pages/Create";
import ViewPost from "./Pages/ViewPost";
import ProductCTXComponent from "./store/ProductContext";

function App() {
    const {setUser} = useContext(AuthContext);

    useEffect(() => {
        onAuthStateChanged(auth, setUser);
    })

    return (
        <div>
            <Routes>
                <Route element={<LoginPage/>} path={'/login'}/>
                <Route element={<ProductCTXComponent><Home/></ProductCTXComponent>} path={'/'}/>
                <Route element={<SignupPage/>} path={'/signup'}/>
                <Route element={<CreatePage/>} path={'/create/'}/>
                <Route element={<ProductCTXComponent><ViewPost/></ProductCTXComponent>} path={'/view/'}/>
            </Routes>
        </div>
    );
}

export default App;
