import { serverTimestamp } from 'firebase/firestore';
import { addDoc, doc, setDoc, collection} from 'firebase/firestore/lite';
import { auth, firestore, db } from '../../../firebase';
import firebase from 'firebase/compat/app'

async function createTrip(source, destination, preference, midpoint1, midpoint2) {
    try {
        const user = auth.currentUser;

        checkIfLatest(user.email);

        alert(midpoint1);

        const data = {
            email: user.email,
            source: source,
            midpoint1: midpoint1,
            midpoint2: midpoint2,
            destination: destination,
            preference: preference,
            latest: "true",
            playlist: null
//            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }
        
        await addDoc(collection(firestore, "pastTrips"), data);
        

    } catch (error) {
        console.log(error.message);
    }
}

function checkIfLatest(email) {
    db.collection("pastTrips").where("email", "==", email).get().then((qSnap) => {
        if (qSnap.empty) {
            // latest
        } else {
            // previous trips exist
            qSnap.docs.forEach((d) => {
                db.collection("pastTrips").doc(d.id).update({latest: "false"})
            }) 
        }
    })
}

export default createTrip;
