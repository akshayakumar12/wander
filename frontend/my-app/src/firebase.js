import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
/*
const db = getFirestore(app)

async function getUsers(db) {
    const userCol = collection(db, 'users')
    const userSnapshot = await getDocs(db)
    const userList = userSnapshot.docs.map(doc => doc.data())
    return cityList;
}
*/