import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import login from "../../../backend/pages/login/login"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <>
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around">
          <Box>
            <h1>this doesnt matter now</h1>
          </Box>
          <Box>
            <h1>Sign In</h1>
            <TextField 
              label="Email or Username" 
              variant="outlined"
              onChange = {(event) => setEmail(event.target.value)}    // save email from user input
            />
            <br></br>
            <br></br>
            <TextField 
              label="Password" 
              variant="outlined"
              type="password"
              onChange = {(event) => setPassword(event.target.value)}   // save password from user input
            />
            <h6 justifyContent="flex-end">Forgot Password</h6>

            <Button variant="contained" 
                    // attempt log in
                    onClick={() => { login(email, password); }}> 
                Log In 
            </Button>
            <h4>Don't Have an Account?</h4>
            <h5>Sign Up</h5>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default Login;
