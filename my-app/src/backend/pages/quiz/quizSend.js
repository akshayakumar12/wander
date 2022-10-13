import { addDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore } from '../../../firebase';

async function QuizSend(qid, answers) {
    await addDoc(collection(firestore, "quizAnswers"), 
    {
        quiz_id: qid,
        quiz_ans: answers,
    });
}

export default QuizSend;