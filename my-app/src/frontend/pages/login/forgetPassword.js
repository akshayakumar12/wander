import Header from "../header/header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import checkEmail from '../../../backend/pages/login/forgotPassword';

var resetPasswordEmail;

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  async function security_questions_click() {
    let validEmail = await checkEmail(email);

    if (validEmail) {
      resetPasswordEmail = email;
      navigate("/securityQuestionnaire");
    }
  }

  const register_click = () => {
    navigate("/register");
  };

  return (
    <Box>
      {/* Header */}

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
          <h1 style={{ textAlign: "left" }}>Forgot Password</h1>
          <p style={{ textAlign: "left" }}>
            {" "}
            Enter your email address to reset your password.
          </p>
          <TextField 
            onChange={(event) => setEmail(event.target.value)}
            label="Email Address" 
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              disableElevation
              uppercase={false}
              onClick={security_questions_click}
            >
              Reset
            </Button>
            <Stack direction="row" alignItems="center" spacing={1}>
              <p>Not a member?</p>
              <Button
                sx={{ color: "primary.contrastText" }}
                onClick={register_click}
              >
                Sign up now
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export {ForgotPassword, resetPasswordEmail};