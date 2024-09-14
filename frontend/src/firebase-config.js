
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyAbqyQYgpkovsx-tiD8T7bkVkC8cFEsYy8",
    authDomain: "beitalmonah-f8729.firebaseapp.com",
    projectId: "beitalmonah-f8729",
    storageBucket: "beitalmonah-f8729.appspot.com",
    messagingSenderId: "1074967120413",
    appId: "1:1074967120413:web:448fc03722a856e90ed4f4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);