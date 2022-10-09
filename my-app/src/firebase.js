import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAg4B5PTAB6LnEUdPrl1Q6GNrkbmq8f41o",
    authDomain: "wander-564ff.firebaseapp.com",
    databaseURL: "https://wander-564ff-default-rtdb.firebaseio.com",
    projectId: "wander-564ff",
    storageBucket: "wander-564ff.appspot.com",
    messagingSenderId: "930702352339",
    appId: "1:930702352339:web:0fb84239483e5a206b9926",
    measurementId: "G-KT7K3LE0PX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);


// Storage
export async function upload(file, currentUser, setLoading) {
    const fileRef = ref(storage, currentUser.uid + '.png');
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {photoURL});
    setLoading(false);
    alert("Uploaded file!");
}
