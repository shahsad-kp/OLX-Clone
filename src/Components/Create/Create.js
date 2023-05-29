import React, {Fragment, useContext, useRef, useState} from 'react';
import './Create.css';
import Header from '../Header/Header';
import {AuthContext, FirebaseContext} from "../../store/FirebaseContext";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {addDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";

const Create = () => {
    const nameRef = useRef(null);
    const categoryRef = useRef(null);
    const priceRef = useRef(null)
    const [image, setImage] = useState('')

    const {storage, firestore} = useContext(FirebaseContext);
    const {user} = useContext(AuthContext);

    const navigator = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const reference = ref(storage, `/images/${image.name}`)
        uploadBytes(reference, image).then((snapshot) => {
            getDownloadURL(reference).then((url) => {
                const data = {
                    name: nameRef.current.value,
                    category: categoryRef.current.value,
                    price: priceRef.current.value,
                    image: url,
                    ownerId: user.uid
                }
                addDoc(collection(firestore, "products"), data).then(
                    r => {
                        alert('Product added..')
                        navigator('/')
                    }
                ).catch(
                    (reason) => alert(reason.message)
                );
            })
        }).catch((reason) => {
            if (reason.code === 'storage/unauthorized'){
                navigator('/login')
            }
            else{
                console.log(reason)
                alert('Unknown error occurred..!')
            }
        })
    }

    return (
        <Fragment>
            <Header/>
            <card>
                <div className="centerDiv">
                    <form>
                        <label htmlFor="fname">Name</label>
                        <br/>
                        <input
                            className="input"
                            type="text"
                            id="fname"
                            name="Name"
                            defaultValue="John"
                            ref={nameRef}
                        />
                        <br/>
                        <label htmlFor="category">Category</label>
                        <br/>
                        <input
                            className="input"
                            type="text"
                            id="category"
                            name="category"
                            defaultValue="John"
                            ref={categoryRef}
                        />
                        <br/>
                        <label htmlFor="price">Price</label>
                        <br/>
                        <input
                            className="input"
                            type="number"
                            id="price"
                            name="Price"
                            ref={priceRef}
                        />
                        <br/>
                    </form>
                    <br/>
                    <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
                    <form>
                        <br/>
                        <input type="file" onChange={(event) => {
                            setImage(event.target.files[0])
                        }}/>
                        <br/>
                        <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
                    </form>
                </div>
            </card>
        </Fragment>
    );
};

export default Create;
