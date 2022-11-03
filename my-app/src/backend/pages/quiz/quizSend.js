import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';
import { db, auth, firestore} from '../../../firebase';

async function QuizSend(email, answers) {

  const data = {
    quiz_id: email,
    quiz_ans: answers,
    timestamp: serverTimestamp()
  };

    const docRef = doc(firestore, "quizAnswers", email);
    await setDoc(docRef, data);

    await addDoc(collection(firestore, "quizAnswersAll"), data);
}

export default QuizSend;
