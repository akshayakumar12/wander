import { Box, Button, Card, Container, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "./loading";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

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

  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const value = localStorage.getItem("theme");
    console.log("type: " + typeof value);
    console.log("value: " + value);
    value == "true" ? setBgColor("#272727") : setBgColor("#F5F8FA");
  });

  return show ? (
    <Container>
      <Stack
        alignItems={"flex-start"}
        margin={0}
        justifyContent="center"
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
            justifyContent="flex-start"
            direction={"column"}
            spacing={4}
            alignItems="flex-start"
          >
            <div
              className="card-section"
              //style={{ padding: 1, width: "100%" }}
            >
              <Grid
                container
                direction={"row"}
                spacing={2}
                rowSpacing={2}
                columnSpacing={3}
                sx={{ marginLeft: "1%", alignItems: "center" }}
              >
                {userPastQuizzes.map((curCard, index) => (
                  <Grid xs={"auto"} key={index} spacing={8}>
                    <Card
                      sx={{
                        margin: 2,
                        boxShadow: 1,
                        backgroundColor: bgColor,
                        borderRadius: 4,
                        padding: 1,
                        paddingRight: 8,
                      }}
                    >
                      <Stack direction={"column"}>
                        <Stack justifyContent={"center"}>
                          <Box
                            sx={{
                              margin: 1,
                              paddingRight: 1,
                              //border: "3px solid black",
                              //borderRadius: 4,
                              // borderRight: 2,
                            }}
                          >
                            <h3
                              align="left"
                              style={{ marginBottom: 3, padding: 0 }}
                            >
                              {
                                /*curCard.timestamp.toDate().getTime()*/ curCard.timestamp
                                  .toDate()
                                  .toString()
                                  .split(" ")
                                  .slice(0, 4)
                                  .join(" ")
                              }
                            </h3>
                            <h3 align="left" style={{ marginY: 4, padding: 1 }}>
                              {
                                /*curCard.timestamp.toDate().getTime()*/ curCard.timestamp
                                  .toDate()
                                  .toString()
                                  .split(" ")
                                  .slice(4, 5)
                                  .join(" ")
                              }
                            </h3>
                          </Box>
                        </Stack>
                        <HorizontalRuleIcon
                          fontSize="large"
                          sx={{ color: "primary.contrastText" }}
                        ></HorizontalRuleIcon>
                        <Stack>
                          <body
                            style={{
                              padding: 0,
                              //border: "3px solid black",
                              //borderRadius: 14,
                              margin: 6,
                              backgroundColor: "transparent",
                            }}
                          >
                            {curCard.quiz_ans
                              .split(",")
                              .slice(0, 5)
                              .map((answer, index) => (
                                <p align="left">
                                  {questions[index]}: {answer}
                                </p>
                              ))}
                          </body>
                        </Stack>
                      </Stack>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </Stack>

          <Button
            sx={{
              bottom: "5%",
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
