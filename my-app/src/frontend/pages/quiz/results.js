import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Quiz, { resultAns } from "./quiz";
import Create from "./create_playlist";
import Loading from "./loading";

function Result() {
  const navigate = useNavigate();

  const [showResults, setShowResults] = useState(false);
  const [quizData, setQuizData] = useState("");
  const questions = [
    "Genre",
    "Mood",
    "Favorite Artist",
    "Traveling Partner(s)",
    "Type",
  ];

  const getQuizData = async () => {
    const response = db.collection("quizAnswers");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (item.data().quiz_id == auth.currentUser.email) {
        setQuizData(item.data());
        setShowResults(true);
      }
    });
  };
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      getQuizData();
    });
  }, []);

  const handleTakeQuiz = () => {
    navigate("/quiz");
  };

  return showResults ? (
    <>
      <div>
        <h1>These are your current preferences</h1>
        <Button
          variant="contained"
          sx={{ width: 200, padding: 2, margin: 2 }}
          onClick={handleTakeQuiz}
        >
          {" "}
          {"Take Quiz"}
        </Button>
        <Stack
          alignItems="center"
          spacing={1}
          direction="column"
          marginLeft="2%"
        >
          {quizData?.quiz_ans
            .split(",")
            .slice(0, 5)
            .map((answerOption, index) => (
              <Card>
                <CardContent>
                  <p style={{ margin: 0 }}>
                    {questions[index]}:&nbsp;{answerOption}
                  </p>
                </CardContent>
              </Card>
            ))}
        </Stack>
      </div>
      <Create />
    </>
  ) : (
    <>
      <Loading></Loading>
    </>
  );
}
export default Result;
