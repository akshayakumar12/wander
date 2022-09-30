import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function login() {
  return (
    <>
      <Box>
        <Stack direction="row" spacing={2} justifyContent="space-around">
          <Box>
            <h1>this doesnt matter now</h1>
          </Box>
          <Box>
            <h1>Sign In</h1>
            <TextField label="Email or Username " variant="outlined" />
            <br></br>
            <br></br>
            <TextField label="Password" variant="outlined" />
            <h6 justifyContent="flex-end">Forgot Password</h6>

            <Button variant="contained">Log in</Button>
            <h4>Don't Have an account?</h4>
            <h5>Sign Up</h5>
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default login;
