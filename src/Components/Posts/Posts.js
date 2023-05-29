import React, {useContext, useEffect, useState} from 'react';
import {collection, getDocs} from "firebase/firestore"

import Heart from '../../assets/Heart';
import './Post.css';
import {FirebaseContext} from "../../store/FirebaseContext";
import {ProductContext} from "../../store/ProductContext";
import {useNavigate} from "react-router-dom";

function Posts() {
    const [posts, setPosts] = useState([]);
    const {firestore} = useContext(FirebaseContext);

    const navigator = useNavigate();

    const {setProduct} = useContext(ProductContext);

    useEffect(() => {
        getDocs(
            collection(firestore, 'products'),
        ).then((snapshot) => {
            setPosts(
                snapshot.docs.map((product) => {
                    return {
                        ...product.data(),
                        id: product.id
                    }
                })
            )
        })
    }, []);


    return (
        <div className="postParentDiv">
            <div className="moreView">
                <div className="heading">
                    <span>Quick Menu</span>
                    <span>View more</span>
                </div>
                <div className="cards">
                    {
                        posts.map((product) => {
                            return (<div
                                className="card"
                                onClick={() => {
                                    setProduct(product);
                                    navigator('/view/');
                                }}
                            >
                                <div className="favorite">
                                    <Heart></Heart>
                                </div>
                                <div className="image">
                                    <img src={product.image} alt=""/>
                                </div>
                                <div className="content">
                                    <p className="rate">&#x20B9; {product.price}</p>
                                    <span className="kilometer">{product.category}</span>
                                    <p className="name">{product.name}</p>
                                </div>
                                <div className="date">
                                    <span>{product.createdAt}</span>
                                </div>
                            </div>)
                        })
                    }
                </div>
            </div>
            <div className="recommendations">
                <div className="heading">
                    <span>Fresh recommendations</span>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="favorite">
                            <Heart></Heart>
                        </div>
                        <div className="image">
                            <img src="../../../Images/R15V3.jpg" alt=""/>
                        </div>
                        <div className="content">
                            <p className="rate">&#x20B9; 250000</p>
                            <span className="kilometer">Two Wheeler</span>
                            <p className="name"> YAMAHA R15V3</p>
                        </div>
                        <div className="date">
                            <span>10/5/2021</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Posts;
