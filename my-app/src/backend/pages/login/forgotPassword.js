import { auth, firestore, db } from '../../../firebase';


async function checkEmail(email) {
    try {
        const userDocRef = firestore.instance.collection('users').doc('billy2@gmail.com');
        const doc = await userDocRef.get();
        if (!doc.exists) {
          console.log('No such document exista!');
        } else {
          console.log('Document data:', doc.data());
        }
    } catch (error) {
        alert(error.code);
    }
};

