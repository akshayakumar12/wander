import { Box, Button, Card, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./loading";

function QuizHistory() {
  const [userPastQuizzes, setUserPastQuizzes] = useState([]);
  const [noPast, setNoPast] = useState(false);
  const [show, setShow] = useState(false);
  const questions = ["Genre", "Mood", "Favorite Artist", "Partner(s)", "Type"];

  const deleteAllQuizData = async () => {
    try {
      const response = db.collection("quizAnswersAll");
      const data = await response.get();
      const temp = [];
      data.docs.forEach((item) => {
        if (item.data().quiz_id == auth.currentUser.email) {
          item.ref.delete();
        }
      });
      db.collection("quizAnswers").doc(auth.currentUser.email).delete();

      setNoPast(true);
      setUserPastQuizzes(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPastQuizData = async () => {
    try {
      const response = db.collection("quizAnswersAll");
      const data = await response.get();
      const temp = [];
      data.docs.forEach((item) => {
        if (item.data().quiz_id == auth.currentUser.email) {
          temp.push(item.data());
        }
      });

      // sort temp by time
      temp.sort((a, b) => b.timestamp - a.timestamp);
      console.log(temp);

      if (temp.length == 0) {
        setNoPast(true);
      }

      setUserPastQuizzes(temp);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      getUserPastQuizData();
    });
  }, []);

  return show ? (
    <Container>
      <Stack
        alignItems={"center"}
        margin={0}
        //style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Quiz History</h1>
      </Stack>

      {noPast ? (
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
              sx={{
                bottom: 0,
                right: "4%",
                position: "absolute",
                bottom: "1%",
              }}
              variant="contained"
            >
              Delete History
            </Button>
          </Stack>
        </>
      ) : (
        <>
          <div className="card-section">
            <Grid
              container
              //container
              spacing={{ xs: 2, md: 3 }}
              //alignItems={{ xs: "center" }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {userPastQuizzes.map((curCard, index) => (
                <Grid xs={3} sm={4} md={4} key={index} spacing={8}>
                  <Card
                    sx={{
                      margin: 4,
                      boxShadow: 1,
                      backgroundColor: "#F2F8F4",
                      borderRadius: 4,
                      width: "auto",
                    }}
                  >
                    <Box
                      sx={{
                        margin: 1,
                        border: "3px solid black",
                        borderRadius: 4,
                      }}
                    >
                      <h3
                        align="center"
                        margin={0}
                        style={{ marginX: 0 }}
                        // style={{ marginBottom: 3, padding: 0 }}
                      >
                        {
                          /*curCard.timestamp.toDate().getTime()*/ curCard.timestamp
                            .toDate()
                            .toString()
                            .split(" ")
                            .slice(0, 3)
                            .join(" ")
                        }
                      </h3>
                      <h3 align="flex-start">
                        {
                          /*curCard.timestamp.toDate().getTime()*/ curCard.timestamp
                            .toDate()
                            .toString()
                            .split(" ")
                            .slice(3, 5)
                            .join(" ")
                        }
                      </h3>
                    </Box>

                    <body
                      style={{
                        padding: 0,
                        border: "3px solid black",
                        borderRadius: 14,
                        margin: 6,
                      }}
                    >
                      {curCard.quiz_ans
                        .split(",")
                        .slice(0, 5)
                        .map((answer, index) => (
                          <p>
                            {questions[index]}: {answer}
                          </p>
                        ))}
                    </body>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          <Button
            sx={{
              bottom: 0,
              left: "50%",
              position: "fixed",
              justifyContent: "flex-end",
              marginLeft: { sm: 75, xs: 10 },
              flex: 1,
            }}
            variant="contained"
            onClick={() => {
              deleteAllQuizData();
            }}
          >
            Delete History
          </Button>
        </>
      )}
    </Container>
  ) : (
    <Loading></Loading>
  );
}

export default QuizHistory;
