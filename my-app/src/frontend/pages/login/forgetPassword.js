import Header from '../header/header'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function editProfile() {
    return (
        <Box>
            {/* Header */}
            <Header />
            <Stack alignItems="center" marginTop="10%">
                {/* My Profile Title */}
                <Stack alignItems="stretch" justifyContent="space-between" spacing={2} style={{ backgroundColor: "", maxWidth: "416px", width: "100%", padding: "5%"}}>
                    <h1 style={{ textAlign: "left"}}>Forgot Password</h1>
                    <p style={{ textAlign: "left"}}> Enter your email address to reset your password</p>
                    <TextField
                        label="Email Address"
                    />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Button variant="contained" disableElevation uppercase={false}>Submit</Button>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <p>Not a member?</p>
                            <p>Sign up now</p>

                        </Stack>
                    </Stack>

                    
                </Stack>



            </Stack>

        </Box>

    )
}