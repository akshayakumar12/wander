import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function register() {


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
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            label="Email Address"
                        />
                        <br></br>
                        <br></br>
                        <TextField
                            label="Password"
                            type="password"
                        />

                        <br></br>
                        <br></br>
                        <Button variant="contained" disableElevation uppercase={false}>Get Started</Button>

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

export default register;