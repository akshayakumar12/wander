import { Button, Card, CardActionArea, Container } from "@mui/material";
import { Stack } from "@mui/system";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db, firestore } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Loading from "./loading";

function QuizHistory() {
  const [userPastQuizzes, setUserPastQuizzes] = useState([]);
  const [noPast, setNoPast] = useState(false);
  const [show, setShow] = useState(false);

  /*useEffect(() => {
    const collectionRef = collection(db, "quizAnswersAll");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsub = onSnapshot(q, (snapshot) =>
      setPastQuizzes(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.ids })))
    );

    return unsub;
  }, []);*/

  const deleteAllQuizData = async () => {
    try {
      const response = db.collection('quizAnswersAll');
      const data = await response.get();
      const temp = []
      data.docs.forEach((item) =>{
          if (item.data().quiz_id == auth.currentUser.email) {
              item.ref.delete();
          }
      })
      db.collection("quizAnswers").doc(auth.currentUser.email).delete();

      /*db.ref('quizAllAnswers').on('value', snapshot => {
        snapshot.forEach(snap => {
          if(snap.val().quiz_id == auth.currentUser.email){
            snap.ref.remove()
            console.log("in")
          };
       });
      });*/

      /*const query = db.collection('quizAllAnswers')
      query.get().then((querySnapshot) => {
        querySnapshot.docs.forEach((snap) => {
          console.log("foreach")
          if (snap.data().email == auth.currentUser.email) {
            snap.ref.delete();
          }
        });
      });

      db.collection("quizAnswers").doc(auth.currentUser.email).delete();*/

      /*const dbRef = db.database().ref("quizAllAnswers");
      dbRef.orderByChild('quiz_id').equalTo(auth.currentUser.email).once('value', (snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
          let nodeKey = childSnapshot.key;
          db.database().ref("quizAllAnswers").child(nodeKey).remove();
        });
      });*/

      setNoPast(true);
      setUserPastQuizzes(temp)
    }
    catch (error) {
      console.log(error)
    }
  };

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

      if (temp.length == 0) {
        setNoPast(true);
      }

      setUserPastQuizzes(temp);
      setShow(true);
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
    show ? (
      <Container>
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Quiz History</h1>
      </Stack>

    { noPast ? (
    
    <>
    <Stack
          justifyContent="center"
          direction={"column"}
          spacing={4}
          alignItems="center"
          marginTop={4}
        >
    <h1>You have no quizzes in your history </h1>
    <Button
          disabled
          sx={{ bottom: 0, right: "4%", position: "absolute", bottom: "1%" }}
          variant="contained">
          Delete History
    </Button>
    </Stack>
    </>
    
    ) : ( 
      <>
      <Stack
          justifyContent="center"
          direction={"column"}
          spacing={4}
          alignItems="center"
          marginTop={4}
        >


          <div className='card-section'>
            <>
              {userPastQuizzes.map((curCard) => (
                <>
                  <Card sx={{ padding: "1%" }}>
                    <CardActionArea>
                      <h4 align="left">
                        {/*curCard.timestamp.toDate().getTime()*/curCard.timestamp.toDate().toString()}
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
            </>

          </div>

        </Stack>
        
        <Button
          sx={{ bottom: 0, right: "4%", position: "absolute", bottom: "1%" }}
          variant="contained"
          onClick={() => { deleteAllQuizData(); } }
        >
            Delete History
        </Button>
        </>
    )}

    </Container>
    ) : (
      <Loading></Loading>
    )
  );
}

export default QuizHistory;
