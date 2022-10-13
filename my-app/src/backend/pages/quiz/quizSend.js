import { setDoc, addDoc, collection } from 'firebase/firestore/lite';
import { auth, firestore } from '../../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useEffect, useState} from 'react';
import { db } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate } from 'react-router-dom';

async function QuizSend(uid, answers) {

    await addDoc(collection(firestore, "quizAnswers"), 
    {
        quiz_id: uid,
        quiz_ans: answers,
    });
}

export default QuizSend;