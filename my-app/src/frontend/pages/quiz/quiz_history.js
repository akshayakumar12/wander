import {
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
} from "@mui/material";
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
        alignItems={"flex-start"}
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
          <Stack
            justifyContent="center"
            direction={"column"}
            spacing={4}
            alignItems="center"
          >
            <div className="card-section">
              <Grid container spacing={2} rowSpacing={2} columnSpacing={3}>
                {userPastQuizzes.map((curCard, index) => (
                  <Grid xs={3} key={index} spacing={8}>
                    <Card
                      sx={{
                        margin: 4,
                        boxShadow: 1,
                        backgroundColor: "#F2F8F4",
                      }}
                    >
                      <Box sx={{ margin: 1, border: "3px solid black" }}>
                        <h3
                          align="center"
                          style={{ marginBottom: 3, padding: 0 }}
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
                        <h3 align="center" style={{ marginY: 4, padding: 1 }}>
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
          </Stack>

          <Button
            sx={{
              bottom: 0,
              left: "50%",
              position: "fixed",
              justifyContent: "flex-end",
              marginLeft: 75,
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
