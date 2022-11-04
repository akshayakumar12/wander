import { doc, setDoc, addDoc, collection } from "firebase/firestore/lite";
import { firestore } from "../../firebase";

async function ToggleSend(email, explicit, mode) {
  const docRef = doc(firestore, "users", email);
  const data = {
    isExplicit: explicit,
    appearance: mode,
  };
  await setDoc(docRef, data);
}

export default ToggleSend;
