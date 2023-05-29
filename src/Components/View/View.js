import React, {useContext, useEffect, useState} from 'react';

import './View.css';
import {ProductContext} from "../../store/ProductContext";
import {FirebaseContext} from "../../store/FirebaseContext";
import {doc, getDoc} from "firebase/firestore"

function View() {
    const [user, setUser] = useState(null);
    const {product} = useContext(ProductContext);
    const {firestore} = useContext(FirebaseContext);

    useEffect(() => {
        getDoc(doc(firestore, "users", product.ownerId)).then((docSnap) => {
            setUser(docSnap.data())
            console.log(user)
        })
    }, [])

    return (
        <div className="viewParentDiv">
            <div className="imageShowDiv">
                <img
                    src={product.image}
                    alt=""
                />
            </div>
            <div className="rightSection">
                <div className="productDetails">
                    <p>&#x20B9; {product.price}</p>
                    <span>{product.name}</span>
                    <p>{product.category}</p>
                    <span>{product.createdAt}</span>
                </div>
                {
                    user &&
                    <div className="contactDetails">
                        <p>Seller details</p>
                        <p>{user.username}</p>
                        <p>{user.phone}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default View;
