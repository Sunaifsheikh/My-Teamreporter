import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import swal from 'sweetalert';
import { auth } from '../Firebase/Firebaseconfig';



const Authentication = (email, password, history) => {
    
    console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            history.push("/login");
        })
        .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}

const LoginAuth = (email, password, history) => {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            swal("Login Successfull")
            history.push("/teamhome")
        })
        .catch((error) => {
            console.log(error.code);
            let err = error.code;
            // auth/user-not-found
            // auth/wrong-password
            if (err === "auth/user-not-found") {
                swal("Invalid Email", "User Not Found", "error");
            } else if (err === "auth/wrong-password") {
                swal("OOps", "Password Not Matched", "error");
            }
            // swal(error.message);
        });
}



export { Authentication, LoginAuth };