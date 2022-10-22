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
import Avatar from "@mui/material/Avatar";

export default function ProfileSetup() {
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

  const back_click = () => {
    navigate("/register");
  };

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
          sx={{ height: "100vh", width: "100%" }}
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
              marginLeft: "10%",
            }}
          />

          <h3 align="left" style={{ fontWeight: "normal", marginLeft: "10%" }}>
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
                Profile Setup
              </h1>

              {/* Components Stack */}
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="stretch"
                spacing={2}
                width="70%"
              >
                {/* Profile Picture*/}
                <Stack spacing={2} alignItems="center">
                  <Avatar sx={{ width: 150, height: 150 }} />
                  <Stack spacing={2} direction="row">
                    <input type="file" accept="image/*" />
                    <Button
                      variant="contained"
                      disableElevation
                      uppercase={false}
                      style={{ fontSize: "12px" }}
                    >
                      Delete Profile Picture
                    </Button>
                  </Stack>
                </Stack>
                {/* First name field */}
                <TextField
                  label="First Name"
                  onChange={(event) => setFirstName(event.target.value)} // save first name from user input
                />

                {/* Last name field */}
                <TextField
                  label="Last Name"
                  onChange={(event) => setLastName(event.target.value)} // save last name from user input
                />

                {/* Username field */}
                <TextField
                  label="Username"
                  onChange={(event) => setUsername(event.target.value)} // save username from user input
                />

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
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#007B7B",
                    textTransform: "none",
                  }}
                  onClick={back_click}
                >
                  Back
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
