import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore/lite';
import { auth, firestore, db } from '../../../firebase';

async function register(email, password, firstName, lastName, username) {
    try {
        const matchingUsers = db.collection('users').where("username", "==", username).get().then((query) => {
            if (query.docs.length != 0) {
                console.log("found matches");
                alert("Username already in use!")
                return;
            } else {
                console.log("no matches");
            }
        });
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(firestore, "users", email), 
                     {uid: user.uid, 
                      email: email, 
                      password: password, 
                      firstName: firstName,
                      lastName: lastName, 
                      username: username, });
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

const checkUsername = (username) => {

}

export default register;
