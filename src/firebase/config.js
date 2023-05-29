import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDmbSLkam3Su_v0SLPCECgzca8qO1wD2OQ",
    authDomain: "olx-clone-af601.firebaseapp.com",
    projectId: "olx-clone-af601",
    storageBucket: "olx-clone-af601.appspot.com",
    messagingSenderId: "152427075033",
    appId: "1:152427075033:web:ace6fd9c3192d8eb23b5c8",
    measurementId: "G-NLMZG7Y0C8"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp);

export {
    auth,
    firestore
};