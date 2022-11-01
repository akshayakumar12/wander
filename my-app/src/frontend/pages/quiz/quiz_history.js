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

  const getUserPastQuizData = async () => {
    try {
      const response = db.collection('quizAnswersAll');
      const data = await response.get();
      const temp = []
      data.docs.forEach(item=>{
          if (item.data().quiz_id == auth.currentUser.email) {
              temp.push(item.data())
          }
      })

      // sort temp by time
      temp.sort((a, b) => b.timestamp - a.timestamp)
      console.log(temp)

      setUserPastQuizzes(temp);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(()=> {
    onAuthStateChanged(auth, () => {
      getUserPastQuizData();
    })
  }, [])

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
                <CardActionArea>
                  <h4 align="left">
                    {/*curCard.timestamp.toDate().getTime()*/
                      curCard.timestamp.toDate().toString()
                    }
                  </h4>
                  <body>
                    <ul align="left">
                      <li>{curCard.quiz_ans}</li>
                    </ul>
                  </body>
                </CardActionArea>
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
