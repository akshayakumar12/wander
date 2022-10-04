import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore } from '../../../firebase';

async function register(email, password, fullName) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await addDoc(collection(firestore, "users"), 
                     {uid: user.uid, email: email, password: password, name: fullName});
    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
            alert("Your email is invalid.");
        } else if (error.code === "auth/weak-password") {
            alert(error.code + "Your password is too weak. Add at least 6 characters.");
        }
    }
};

export default register;
