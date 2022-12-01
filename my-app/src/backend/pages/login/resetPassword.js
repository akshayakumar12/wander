import { auth, firestore, db } from '../../../firebase';

async function resetPassword(email, newPassword, confirmPassword) {
    if (newPassword != confirmPassword) {
        alert("Your passwords do not match. Try again.");
        return false;
    }

    return true;
    
}

export default resetPassword;