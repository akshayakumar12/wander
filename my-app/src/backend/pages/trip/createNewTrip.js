import { addDoc, doc, setDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore, db } from '../../../firebase';

async function createTrip(source, destination, preference) {
    try {
        const user = auth.currentUser;

        checkIfLatest(user.email);

        const data = {
            email: user.email,
            sourceLocation: source,
            destinationLocation: destination,
            travelPreference: preference,
            latest: "true",
            playlist: null,
            timestamp: null
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
