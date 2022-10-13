import { doc, setDoc, addDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore } from '../../../firebase';

async function QuizSend(email, answers) {

    const docRef = doc(firestore, "quizAnswers", email);
    const data = {
        quiz_id: email,
        quiz_ans: answers,
    }

    await setDoc(docRef, data);

    /*await addDoc(collection(firestore, "quizAnswers"), 
    {
        quiz_id: email,
        quiz_ans: answers,
    });*/
}

export default QuizSend;