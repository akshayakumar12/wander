import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc } from 'firebase/firestore/lite';
//import { doc, setDoc } from "firebase/firestore"; 
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

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
const db = getFirestore(app);

// Get a list of cities from your database
async function getUsers(db) {
  console.log("Started")
  const userCol = collection(db, 'users');
  console.log("Waiting")
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map(doc => doc.data());
  console.log("Ending")
  return userList;
}

let x = getUsers(db);
console.log(x)

x.then(function(result) {
    console.log(result)
});

await setDoc(doc(db, "users", "JEB"), {
    name: "Jeb"
});