import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import {useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import { auth, db } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import Quiz, { resultAns } from "./quiz";
import Create from "./create_playlist"
import Loading from "./loading";


function Result() {

  const navigate = useNavigate()
  
  const [showResults, setShowResults ] = useState(false);
  const [quizData, setQuizData] = useState("");

  const getQuizData = async () => {
    const response = db.collection('quizAnswers');
    const data = await response.get();
    data.docs.forEach(item=>{
        if (item.data().quiz_id == auth.currentUser.email) {
            setQuizData(item.data())
            setShowResults(true);
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
    showResults ? (
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
        </Stack>
      </div>
    </>
    ) : (
      <>
        <Loading></Loading>
      </>
    )
  );
}
export default Result;
