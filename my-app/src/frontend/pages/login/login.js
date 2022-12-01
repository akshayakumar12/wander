import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import Login_home from "../../../backend/pages/login/login";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Link, Typography } from "@mui/material";
import Logo from "../wander logo.png";
import ConLogo from "../con_logo.png";
import Music from "../music.png";
import { Container } from "@mui/system";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { ThemeProvider } from "@mui/material/styles";
import { Theme } from "../theme";
import BootstrapUsage from "../theme";
import "../style.css";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import SpotifyListenPhoto from "../../assets/spotify listen photo.jpg";
import TestPrint from "../theme";

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
    //<ThemeProvider theme={Theme}>
    <Container maxWidth="xl" disableGutters="true">
      {/*<h1> test</h1>
        <TestPrint />
        <h1> test</h1>
  */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="flex-start"
        alignItems={"left"}
      >
        <Stack
          //style={{ background: "#F5ECE3" }}
          //style={{ background: "primary.main" }}
          sx={{
            height: "100vh",
            width: "100%",
            display: { sm: "flex", xs: "none" },
            bgcolor: "primary.main",
          }}
          alignItems="flex-start"
        >
          <img
            src={ConLogo}
            alt="Brand Logo"
            height={75}
            width={75}
            align="left"
            style={{
              //marginRight: "85%",
              top: 0,
              left: "0%",
              position: "fixed",
              justifyContent: "flex-end",
              marginLeft: { sm: 75, xs: 10 },
              flex: 1,
            }}
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

          {/*
            <img
              src={Music}
              alt="Brand Logo"
              height={375}
              width={375}
              //align="center"
              style={{
                border: "2px solid #525050",
                boxShadow: "10px 10px 5px #525050",
                marginLeft: "10%",
              }}
            />
            */}
          <img
            src={SpotifyListenPhoto}
            height={375}
            weight={375}
            style={{
              marginLeft: "10%",
              boxShadow: "4px 4px 4px #cfbea9",
              borderRadius: "0px 0px 100px 0px",
            }}
          />
          <br></br>
          <Stack paddingY="5%" paddingX="10%" spacing={1}>
            <Box
              margin={0}
              sx={{
                color: "primary.contrastText",
              }}
            >
              <h2
                className="lexend"
                style={{
                  textAlign: "left",
                  fontWeight: "500",
                  margin: "0",
                }}
              >
                Playlist Creation
              </h2>
            </Box>
            <h3 style={{ fontWeight: "400", textAlign: "left" }}>
              Create the ultimate playlist for your travels
            </h3>
            <Box sx={{ color: "#DE6600", textAlign: "left" }}>
              <HorizontalRuleIcon
                style={{ marginLeft: "-7" }}
                sx={{ fontSize: 50, align: "left" }}
              />
            </Box>
          </Stack>
        </Stack>{" "}
        <Container maxWidth="xl">
          <Box>
            <br></br>
            <img src={Logo} alt="Brand Logo" height={125} />
            <h1
              style={{
                color: "primary.main",
                fontWeight: "400",
                marginLeft: "13%",
                fontSize: "25px",
              }}
              align="left"
            >
              Log In
            </h1>

            <TextField
              label="Email or Username"
              variant="outlined"
              style={{ width: "75%" }}
              sx={{
                //"& .MuiInputLabel-root": { color: "green" }, //styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#783800",
                  },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: "#DE6600",
                  },
                },
              }}
              onChange={(event) => setEmail(event.target.value)} // save email from user input
            />
            <br></br>
            <br></br>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              style={{ width: "75%" }}
              sx={{
                //"& .MuiInputLabel-root": { color: "green" }, //styles the label
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "#783800" },
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& > fieldset": {
                    borderColor: "#DE6600",
                  },
                },
              }}
              onChange={(event) => setPassword(event.target.value)} // save password from user input
            />

            <br></br>
            <div align="right">
              <Link
                className="subtitle"
                component="button"
                variant="body3"
                color={"#838587"}
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
              id="orangeButton"
              style={{
                //backgroundColor: "#DE6600",
                textTransform: "none",
                width: "75%",
              }}
              onClick={login_button_click}
            >
              Log In
            </Button>
            <h5
              style={{
                color: "#838587",
                marginBottom: "0",
                fontWeight: "400",
              }}
            >
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
    //</ThemeProvider>
  );
}

export default Login;
