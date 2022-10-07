import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Header from '../header/header'

function profile () {

    return (
        <Box>
            <Header/>
            <Stack spacing={2}>

                {/* My Profile Title */}
                <Stack alignItems={"flex-start"}style={{marginLeft: "50px", marginRight: "50px", }}><h1>My Profile</h1></Stack>

                {/* Profile Box */}
                <Stack direction="row" alignItems="center" justifyContent="space-between" style={{backgroundColor: "#f3f5f9", padding: "30px", marginLeft: "50px", marginRight: "50px", }}>

                    
                    {/* Profile Picture*/}
                    <Box>
                        <Avatar 
                            src="/broken-image.jpg" 
                            sx={{ width: 150, height: 150}}
                        />
                    </Box>

                    {/* User Information */}
                    <Stack direction="column" spacing={1}>
                        <h2>Full Name</h2>
                        <p>@username</p>
                        <p>email address</p>
                    </Stack>

                    {/* Edit Profile and Settings Box */}
                    <Paper style={{backgroundColor: "#f3f5f9"}}>
                        <Button>Edit Profile</Button>
                        <br></br>
                        <Button>Settings</Button>
                    </Paper>

                </Stack>

                {/* Spotify Buttons */}
                <Stack spacing={2} justifyContent="center" direction="row">
                    <Button variant="contained">Connect to Spotify</Button>
                    <Button variant="contained" color="error">Disconnect to Spotify</Button>
                </Stack>

            </Stack>

            <Button style={{position: 'absolute', bottom: 40}}>Logout</Button>
        </Box>
    )
}

export default profile;