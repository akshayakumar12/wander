import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Logged In!");
    } catch (error) {
        if (error.code === "auth/invalid-email") {
            alert("Your email is invalid.");
        } else if (error.code === "auth/user-not-found") {
            alert("Your username is invalid.");
        } else if (error.code === "auth/wrong-password") {
            alert("Your password is incorrect.");
        } else if (error.code === "auth/user-disabled") {
            alert("Your account has been disabled.");
        } 
    }
};

export default login;