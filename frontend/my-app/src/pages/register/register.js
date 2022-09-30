import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function register() {

    return (
        <Box>
            <Grid container direction="row" columnSpacing={5} justifyContent="center">
                <Grid item>
                    <Box>
                        <h1>askldjfalsk;jf</h1>
                    </Box>
                </Grid>

                <Grid item>
                    <Box> 
                        <h1>Register</h1>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <br></br>
                        <br></br>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                        <br></br>
                        <br></br>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" />

                    </Box>
                </Grid>

            </Grid>
        </Box>
    )
}

export default register;