import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import {useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { auth, db } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import Quiz, { resultAns } from "./quiz";

function Result() {

  const navigate = useNavigate()

  const [quizData, setQuizData] = useState("");
  const getQuizData = async () => {
    const response = db.collection('quizAnswers');
    const data = await response.get();
    data.docs.forEach(item=>{
        if (item.data().quiz_id == auth.currentUser.email) {
            setQuizData(item.data())
        }
    })
  }
  useEffect(()=> {
    onAuthStateChanged(auth, () => {
        getQuizData();
    })
  }, [])

  const handleTakeQuiz = () => { 
    navigate('/quiz')
  }

  return (
    <>
    <div>
        <h1>These are your current preferences</h1>
        <Button variant="contained" sx={{ width: 200, padding: 2, margin: 2 }} onClick={handleTakeQuiz}> {"Take Quiz"}</Button>
        <Stack
          width="50%"
          alignItems="flex-start"
          spacing={4}
          direction="column"
          marginLeft="2%"
        >
          <Card>
            <CardContent>{quizData?.quiz_ans}</CardContent>
          </Card>

          {/*
          <Card>
            <CardContent>Christain Rock</CardContent>
          </Card>

          <Card>
            <CardContent>Mongolian Throat Singing</CardContent>
          </Card>

          <Card>
            <CardContent>EDM</CardContent>
          </Card>
          */}
        </Stack>
      </div>
      </>
  );
}
export default Result;
