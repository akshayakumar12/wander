import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Login_home from "../../../backend/pages/login/login";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "@mui/material";
import Logo from "../wander logo.png";
import ConLogo from "../con_logo.png";
import Music from "../music.png";
import { Container } from "@mui/system";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  if (auth.currentUser) {
    navigate("/home");
  }

  onAuthStateChanged(auth, () => {
    if (auth.currentUser) {
      navigate("/home");
    }
  });

  const login_button_click = () => {
    Login_home(email, password);
    if (auth.currentUser) {
      navigate("/home");
    }
  };

  const forgot_password_click = () => {
    navigate("/forgotPassword");
  };

  const register_click = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="xl" disableGutters="true">
      <Stack direction="row" justifyContent="flex-start" alignItems={"left"}>
        <Stack
          style={{ background: "#F5ECE3" }}
          sx={{ height: "100vh", width: "100%" }}
          alignItems="flex-start"
        >
          <img
            src={ConLogo}
            alt="Brand Logo"
            height={75}
            width={75}
            align="left"
            style={{ marginRight: "85%" }}
          />
          <br></br>
          <br></br>

          <img
            src={Music}
            alt="Brand Logo"
            height={375}
            width={375}
            align="center"
            style={{
              border: "2px solid #525050",
              boxShadow: "10px 10px 5px #525050",
              marginLeft: "10%",
            }}
          />
          <br></br>

          <h3 align="left" style={{ fontWeight: "normal", marginLeft: "10%" }}>
            Create the ultimate playlist for your travels
          </h3>
        </Stack>
        <Container maxWidth="xl">
          <Box>
            <br></br>
            <img src={Logo} alt="Brand Logo" height={125} />
            <h1
              style={{ fontWeight: "normal", marginLeft: "13%" }}
              align="left"
            >
              Sign In
            </h1>
            <TextField
              label="Email or Username"
              variant="outlined"
              style={{ width: "75%" }}
              onChange={(event) => setEmail(event.target.value)} // save email from user input
            />
            <br></br>
            <br></br>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              style={{ width: "75%" }}
              onChange={(event) => setPassword(event.target.value)} // save password from user input
            />
            <br></br>
            <div align="right">
              <Link
                component="button"
                variant="body3"
                color={"#C3C4C5"}
                style={{ marginRight: "13%" }}
                onClick={forgot_password_click}
              >
                Forgot Password
              </Link>
            </div>

            <br></br>

            <Button
              variant="contained"
              // attempt log in
              style={{
                backgroundColor: "#DE6600",
                textTransform: "none",
                width: "75%",
              }}
              onClick={login_button_click}
            >
              Log In
            </Button>
            <h5 style={{ color: "#C3C4C5", marginBottom: "0" }}>
              Don't Have an Account?
            </h5>
            <Link
              onClick={register_click}
              color={"#02387C"}
              variant="body3"
              fontWeight={"bold"}
            >
              Sign Up
            </Link>
          </Box>
        </Container>
      </Stack>
    </Container>
  );
}

export default Login;
