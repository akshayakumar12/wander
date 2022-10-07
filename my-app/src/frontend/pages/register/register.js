import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useState } from "react";
import register from '../../../backend/pages/register/register';


function Register() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <Box>
            <Grid container direction="row" columnSpacing={5} justifyContent="center">
                <Grid item>
                    <Box>
                        <h1>[placeholder]</h1>
                    </Box>
                </Grid>

                <Grid item>
                    <Box> 
                        <h3>Register</h3>
                        <TextField
                            label="Full Name"
                            onChange = {(event) => setFullName(event.target.value)}    // save full name from user input
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            label="Email Address"
                            onChange = {(event) => setEmail(event.target.value)}    // save email from user input
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            label="Password"
                            type="password"
                            onChange = {(event) => setPassword(event.target.value)}    // save password from user input
                        />

                        <br></br>
                        <br></br>
                        <Button 
                            variant="contained" 
                            disableElevation uppercase={false}
                            // create new user
                            onClick={() => { register(email, password, fullName); }} >
                                Get Started
                        </Button>

                        <br></br>
                        <br></br>

                        <body>Already have an account?</body>
                        <Button>Log In</Button>


                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default Register;