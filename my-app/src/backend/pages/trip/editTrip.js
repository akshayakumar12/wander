import { addDoc, doc, setDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore, db } from '../../../firebase';

async function editTrip(oldSource, oldDestination, newSource, newDestination, newPreference) {
    try {
        const user = auth.currentUser;

        db.collection("pastTrips").where("email", "==", user.email).get().then((qSnap) => {
            if (qSnap.empty) {
                // latest
            } else {
                // previous trips exist
                qSnap.docs.forEach((d) => {
                    if ((d.data().source===oldSource) && (d.data().destination===oldDestination)) {
                        db.collection("pastTrips").doc(d.id).update({source: newSource})
                        db.collection("pastTrips").doc(d.id).update({destination: newDestination})
                        db.collection("pastTrips").doc(d.id).update({preference: newPreference})
                    }
                }) 
            }
        })
        
    } catch (error) {
        console.log(error.message);
    }
}

export default editTrip;