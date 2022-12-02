import { auth, firestore, db } from '../../../firebase';
import ForgotPassword from '../../../frontend/pages/login/forgetPassword';

async function checkEmail(email) {
  if (!(email.includes("@"))) {
    alert("Please enter a valid email.");
    return;
  } else if (!(email.includes("."))) {
    alert("Please enter a valid email.");
    return;
  }

  const docRef = db.collection('users').doc(email);

  let docSnapshot = await docRef.get();
  
  if (docSnapshot.exists) {
    return true;
  } else {
    alert("Your email is not registered with Firebase.");
  }
}

export default checkEmail;