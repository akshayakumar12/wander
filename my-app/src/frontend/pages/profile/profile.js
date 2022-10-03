import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

function profile () {

    return (
        <Box>
            <h1>My Profile</h1>
            <Stack spacing={2}>
                {/* Profile Box */}
                <Stack direction="row" alignItems="center" justifyContent="space-evenly" style={{backgroundColor: "#f3f5f9"}}>

                    
                    {/* Profile Picture*/}
                    <Box>
                        <Avatar 
                            src="/broken-image.jpg" 
                            sx={{ width: 150, height: 150}}
                        />
                    </Box>

                    {/* User Information */}
                    <Box></Box>
                    <Box>
                        <h1>Full Name</h1>
                        <br></br>
                        <p>@username</p>
                        <br></br>
                        <p>email address</p>
                    </Box>

                    {/* Edit Profile and Settings Box */}
                    <Paper style={{backgroundColor: "#f3f5f9"}}>
                        <Button>Edit Profile</Button>
                        <br></br>
                        <Button>Settings</Button>
                    </Paper>

                </Stack>
            </Stack>
        </Box>
    )
}

export default profile;