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
        alert(error.message);
    }
};

export default register;
