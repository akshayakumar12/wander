import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase'

async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        alert("Logged In!");
    } catch (error) {
        alert(error.message);
    }
};

export default login;