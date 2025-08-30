import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword,
        signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyC28bTZm2WxfHv7OUnkMdBdTQE71biBniw",
  authDomain: "netflix-clone-e2261.firebaseapp.com",
  projectId: "netflix-clone-e2261",
  storageBucket: "netflix-clone-e2261.firebasestorage.app",
  messagingSenderId: "972517274401",
  appId: "1:972517274401:web:132a6ae40da928805c8460"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);


const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User created successfully:", user);
  } catch (error) {
    console.log(error.code)
   toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};


const login=async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error.code)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}


const logout=()=>{
    signOut(auth)
}


export {auth,db,login,signup,logout};