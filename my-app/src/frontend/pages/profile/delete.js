import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import login from "../../../backend/pages/login/login";

function check() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Box>
        <h1>Sign In</h1>
        <TextField
          label="Email or Username"
          variant="outlined"
          onChange={(event) => setEmail(event.target.value)} // save email from user input
        />
        <br></br>
        <br></br>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          onChange={(event) => setPassword(event.target.value)} // save password from user input
        />
        <h6 justifyContent="flex-end">Forgot Password</h6>

        <Button
          variant="contained"
          // attempt log in
          onClick={() => {
            login(email, password);
          }}
        >
          Confirm Information
        </Button>
      </Box>
    </>
  );
}

export default check;
