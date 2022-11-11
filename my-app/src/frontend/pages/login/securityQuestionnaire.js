import Header from "../header/header";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { resetPasswordEmail } from './forgetPassword';
import checkSecurityQuestions from '../../../backend/pages/login/checkSecurityQuestions';

function SecurityQuestionnaire() {
  const navigate = useNavigate();

  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  async function submit_click() {
    console.log(resetPasswordEmail);
    console.log(answer1);
    console.log(answer2);

    let validSecurityAnswers = await checkSecurityQuestions(resetPasswordEmail, answer1, answer2);
    if (validSecurityAnswers) {
      navigate("/newPassword");
    }
  }

  return (
    <>
      <Stack alignItems="center" marginTop="10%">
        {/* My Profile Title */}
        <Stack
          alignItems="stretch"
          justifyContent="space-between"
          spacing={2}
          style={{
            backgroundColor: "",
            maxWidth: "416px",
            width: "100%",
            padding: "5%",
          }}
        >
          {/* Title */}
          <h1 style={{ textAlign: "left" }}>Security Questions</h1>

          {/* Question 1 */}
          <p style={{ textAlign: "left" }}>What is your favorite sport?</p>
          <TextField onChange={(event) => setAnswer1(event.target.value)} />

          {/* Question 2 */}
          <p style={{ textAlign: "left" }}>What is your favorite color?</p>
          <TextField onChange={(event) => setAnswer2(event.target.value)} />

          {/* Submit Button */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              disableElevation
              uppercase={false}
              onClick={submit_click} //add authentication
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default SecurityQuestionnaire;
