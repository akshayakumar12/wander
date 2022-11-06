import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React, { useState } from "react";
import register from "../../../backend/pages/register/register";
import { useNavigate } from "react-router-dom";
import ConLogo from "../con_logo.png";
import Music from "../music.png";
import { Container } from "@mui/system";
import Logo from "../wander logo.png";
import Grid from "@mui/material/Grid";
import { Link } from "@mui/material";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [security1, setSecurity1] = useState("");
  const [security2, setSecurity2] = useState("");

  const navigate = useNavigate();

  const login_click = () => {
    navigate("/login");
  };

  function getStarted_click() {
    navigate("/profileSetup");
  }

  return (
    <Container maxWidth="xl" disableGutters="true">
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems={"left"}
        style={{ background: "#F5ECE3" }}
      >
        {/* Left Stack */}
        <Stack
          //style={{ background: "#F5ECE3" }}
          sx={{
            height: "100vh",
            width: "100%",
            display: { sm: "block", xs: "none" },
          }}
          alignItems="flex-start"
          justifyContent="stretch"
          spacing={4}
        >
          <img
            src={ConLogo}
            alt="Brand Logo"
            height={75}
            width={75}
            align="left"
            style={{ marginRight: "85%" }}
          />

          <img
            src={Music}
            alt="Brand Logo"
            height={375}
            width={375}
            align="center"
            style={{
              border: "2px solid #525050",
              boxShadow: "10px 10px 5px #525050",
              marginRight: "10%",
            }}
          />

          <h3 align="left" style={{ fontWeight: "normal", marginLeft: "20%" }}>
            Create the ultimate playlist for your travels
          </h3>
        </Stack>

        {/* Right Components Stack */}
        <Box
          p={4}
          sx={{
            backgroundColor: "#ffffff",
            minHeight: "100%",
            display: "flex",
            width: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            //alignItems="center"
            spacing={2}
          >
            <Stack width="100%" alignItems="center">
              {/* Logo */}
              <img src={Logo} alt="Brand Logo" height={125} />
            </Stack>

            <Stack marginX="15%" width="100%">
              {/* My Profile Title */}
              <h1 style={{ textAlign: "left", fontWeight: "normal" }}>
                Register
              </h1>

              {/* Components Stack */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                width="70%"
              >
                {/* Email field */}
                <TextField
                  label="Email Address"
                  onChange={(event) => setEmail(event.target.value)} // save email from user input
                />

                {/* Password field */}
                <TextField
                  label="Password"
                  type="password"
                  onChange={(event) => setPassword(event.target.value)} // save password from user input
                />

                {/* Questionaire 1: What is your favorite sport? */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    What is your favorite sport
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="sport"
                    onClick={(event) => setSecurity1(event.target.innerText)}
                  >
                    <MenuItem value={10}>Tennis</MenuItem>
                    <MenuItem value={20}>Soccer</MenuItem>
                    <MenuItem value={30}>Football</MenuItem>
                    <MenuItem value={40}>Swimming</MenuItem>
                    <MenuItem value={50}>Dancing</MenuItem>
                    <MenuItem value={60}>Cheerleading</MenuItem>
                    <MenuItem value={60}>Baseball</MenuItem>
                    <MenuItem value={70}>Badminton</MenuItem>
                    <MenuItem value={80}>Basketball</MenuItem>
                    <MenuItem value={90}>Rugby</MenuItem>
                    <MenuItem value={100}>Figure Skating</MenuItem>
                  </Select>
                </FormControl>

                {/* Questionaire 2: What is your favorite color? */}
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    What is your favorite color?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="color"
                    onClick={(event) => setSecurity2(event.target.innerText)}
                  >
                    <MenuItem value={10}>Red</MenuItem>
                    <MenuItem value={20}>Green</MenuItem>
                    <MenuItem value={30}>Blue</MenuItem>
                    <MenuItem value={40}>Yellow</MenuItem>
                    <MenuItem value={50}>Purple</MenuItem>
                    <MenuItem value={60}>Black</MenuItem>
                    <MenuItem value={60}>White</MenuItem>
                    <MenuItem value={70}>Orange</MenuItem>
                    <MenuItem value={80}>Teal</MenuItem>
                    <MenuItem value={90}>Cyan</MenuItem>
                    <MenuItem value={100}>Fuchsia</MenuItem>
                  </Select>
                </FormControl>

                {/* Get Started button */}
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#007B7B",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    register(
                      email,
                      password,
                      firstName,
                      lastName,
                      username,
                      security1,
                      security2
                    );
                    getStarted_click();
                  }}
                >
                  Get Started
                </Button>

                {/* Log in option */}
                <h5 style={{ color: "#C3C4C5", marginBottom: "0" }}>
                  Already have an account?
                </h5>
                <Link
                  color={"#02387C"}
                  variant="body3"
                  fontWeight={"bold"}
                  onClick={login_click}
                >
                  Log In
                </Link>
              </Stack>
            </Stack>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}

export default Register;
