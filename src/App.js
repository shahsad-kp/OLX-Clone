import React from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";

function App() {
    return (
        <div>
            <Routes>
                <Route element={<Home/>} path={'/'} />
                <Route element={<SignupPage/>} path={'/signup'}/>
            </Routes>
        </div>
    );
}

export default App;
