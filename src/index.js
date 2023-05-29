import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Context, {FirebaseContext} from "./store/FirebaseContext";
import {auth, firestore, storage} from "./firebase/config";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Context>
                <FirebaseContext.Provider value={{firestore, auth, storage}}>
                    <App/>
                </FirebaseContext.Provider>
            </Context>
        </BrowserRouter>,
    </React.StrictMode>
);
