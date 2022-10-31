import { Button, Card, CardActionArea, Container } from "@mui/material";
import { Stack } from "@mui/system";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function QuizHistory() {
  const [pastQuizzes, setPastQuizzes] = useState([{ quiz_id: "Loading...", quiz_ans: "initial" }]);
  const [userPastQuizzes, setUserPastQuizzes] = useState([]);
  const [currentCard, setCurrentCard] = useState(0); // keeps track of card number

  /*useEffect(() => {
    const collectionRef = collection(db, "quizAnswersAll");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setPastQuizzes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.ids })))
    );

    return unsub;
  }, []);*/
  useEffect(()=> {
    onAuthStateChanged(auth, () => {getUserPastQuizData();})
  }, [])

  const getUserPastQuizData = async () => {
    const response = db.collection('quizAnswersAll');
    const data = await response.get();
    data.docs.forEach(item=>{
        if (item.data().quiz_id == auth.currentUser.email) {
            userPastQuizzes.push(item.data())
        }
    })
    console.log(userPastQuizzes)
  }



  return (
    <Container>
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Past Quiz Preferences</h1>
      </Stack>

      <Stack
        justifyContent="center"
        direction={"column"}
        spacing={4}
        alignItems="center"
        marginTop={4}
      >
      <div className='card-section'>
          {userPastQuizzes.map((curCard) => (
              <>
              <Card sx={{ padding: "1%" }}>
                {curCard.quiz_ans}
              </Card>
              <br></br>
              </>
          ))}
      </div>
      </Stack>

      <Button
        sx={{ bottom: 0, right: "4%", position: "absolute", bottom: "1%" }}
        variant="contained"
      >
        Delete History
      </Button>
    </Container>
  );
}

export default QuizHistory;
