import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore/lite';
import { auth, firestore, db } from '../../../firebase';

async function register(email, password, firstName, lastName, username, security1, security2) {
    checkUniqueUsername(username);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const docRef = doc(firestore, "users", email);
        const data = {
            uid: user.uid, 
            email: email, 
            password: password, 
            firstName: firstName,
            lastName: lastName, 
            username: username, 
            securityQuestion1: security1,
            securityQuestion2: security2
        }

        await setDoc(docRef, data);

    } catch (error) {
        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered.");
        } else if (error.code === "auth/invalid-email") {
            alert("Your email is invalid.");
        } else if (error.code === "auth/weak-password") {
            alert("Your password is too weak. Add at least 6 characters.");
        }
    }
};

function checkUniqueUsername(username) {
    db.collection("users").where("username", "==", username).get().then((qSnap) => {
        if (qSnap.empty) {
            // unique username
            // for debugging: console.log("no username found")
        } else {
            // username is taken
            // for debugging: console.log("username")
            /* qSnap.docs.forEach((d) => {
                console.log(d.data())
            }) */
            alert("Your username is already taken. Choose a different one.");
        }
    })
}

export default register;
