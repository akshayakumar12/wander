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
import "../style.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Theme } from "../theme";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";

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
    <ThemeProvider theme={Theme}>
      <Container maxWidth="xl" disableGutters="true">
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems={"left"}
          //style={{ background: "#F5ECE3" }}
          sx={{ bgcolor: "primary.main" }}
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

            <Stack paddingY="5%" paddingX="15%" spacing={1}>
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
              <Box sx={{ color: "#007A7A", textAlign: "left" }}>
                <HorizontalRuleIcon
                  style={{ marginLeft: "-7" }}
                  sx={{ fontSize: 50, align: "left" }}
                />
              </Box>
            </Stack>
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
                <h1
                  style={{
                    textAlign: "left",
                    fontWeight: "400",
                    fontSize: "25px",
                  }}
                >
                  Register
                </h1>

                <h1
                  style={{
                    textAlign: "left",
                    fontWeight: "400",
                    fontSize: "16px",
                  }}
                >
                  Account Information
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
                    sx={{
                      //"& .MuiInputLabel-root": { color: "green" }, //styles the label
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#007A7A" },
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#007A7A",
                        },
                      },
                    }}
                    onChange={(event) => setEmail(event.target.value)} // save email from user input
                  />

                  {/* Password field */}
                  <TextField
                    label="Password"
                    type="password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#007A7A" },
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#007A7A",
                        },
                      },
                    }}
                    onChange={(event) => setPassword(event.target.value)} // save password from user input
                  />

                  <h1
                    style={{
                      textAlign: "left",
                      fontWeight: "400",
                      fontSize: "16px",
                    }}
                  >
                    Security Questions
                  </h1>
                  {/* Questionaire 1: What is your favorite sport? */}
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#007A7A" },
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#007A7A",
                        },
                      },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      What is your favorite sport
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="What is your favorite sport"
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
                  <FormControl
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& > fieldset": { borderColor: "#007A7A" },
                      },
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          borderColor: "#007A7A",
                        },
                      },
                    }}
                  >
                    <InputLabel id="demo-simple-select-label" label="label">
                      What is your favorite color
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="What is your favorite color"
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
                    id="greenButton"
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
                  <h5
                    style={{
                      color: "#838587",
                      marginBottom: "0",
                      fontWeight: "400",
                    }}
                  >
                    Already have an account?
                  </h5>
                  <Link
                    color={"primary.contrastText"}
                    variant="body3"
                    style={{ marginTop: "5px" }}
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
    </ThemeProvider>
  );
}

export default Register;
