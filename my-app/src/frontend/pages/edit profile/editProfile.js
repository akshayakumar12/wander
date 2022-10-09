import Header from '../header/header'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import { auth, storage, upload } from '../../../firebase';

export default function EditProfile() {
    const [photoURL, setPhotoURL] = useState("/broken-image.jpg");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    
    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    }

    function handleClick() {
        upload(photo, auth.currentUser, setLoading);
    }

    useEffect(() => {
        if (auth.currentUser?.photoURL) {
            setPhotoURL(auth.currentUser.photoURL);
        }
    }, [auth.currentUser]);

    return (
        <Box>
            {/* Header */}
            <Header />

            {/* My Profile Title */}
            <Stack alignItems={"flex-start"} style={{marginLeft: "50px", marginRight: "50px", }}><h1>Edit Profile</h1></Stack>

            {/* Components Stack */}
            <Stack direction="row" alignItems="center" justifyContent="space-between" style={{padding: "0px", marginLeft: "50px", marginRight: "50px", }}>

                
                {/* Profile Picture*/}
                <Stack spacing={2} alignItems="center" width="25%">
                    <Avatar 
                        src={photoURL}
                        sx={{ width: 150, height: 150}}
                    />
                    <input 
                        type="file"
                        onChange = {handleChange}/>
                    <Button 
                        variant="contained" 
                        disableElevation uppercase={false}
                        disabled = {loading || !photo}
                        onClick = {handleClick}>
                            Upload new photo
                    </Button>
                </Stack>

                {/* Text Fields */}
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} width="70%">
                    <TextField
                        label="First Name"
                        defaultValue="First"
                    />
                    <TextField
                        label="Last Name"
                        defaultValue="Last"
                    />
                    <TextField
                        label="Username"
                        defaultValue="username"
                    />
                    <TextField
                        label="Email Address"
                        defaultValue="name@email.com"
                    />
                    <TextField
                        label="Old Password"
                        type="password"
                    />
                    <TextField
                        label="New Password"
                        type="password"
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                    />

                    {/* Submit + Delete Buttons */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Button variant="contained">Submit</Button>
                        <Button variant="contained" color="error">Delete Account</Button>
                    </Stack>

                </Stack>
            </Stack>
        </Box>

    )
}