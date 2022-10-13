import Header from '../header/header'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import * as React from 'react'
import { DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react'; 
import {auth, db, record} from "../../../firebase"
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";

export default function EditProfile() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate()
    const [user, setUser] = useState("")
    useEffect(() => {
        onAuthStateChanged(auth, () => {
            if (auth.currentUser) {
                setUser(auth.currentUser)
            } else {
                navigate('/')
            }
        })
    }, [])

    const [userInfo, setUserInfo] = useState("");    
    const getData = async () => {
        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(item=>{
            if (item.data().email == auth.currentUser.email) {
                setUserInfo(item.data())
            }
        })
    }

    const modifyData = async (first, last) => {
        var userRef = db.collection('users').doc(auth.currentUser.email);
        userRef.set({
            firstName: first,
            lastName: last
        }, {merge: true})
    }

    
    useEffect(()=> {
        onAuthStateChanged(auth, () => {
            getData();
        })
    }, [])

    const [first, setFirst] = React.useState("");
    const [f, setF] = React.useState("abcd");
    
    const [last, setLast] = React.useState("");
    const [l, setL] = React.useState("abcd");

    const [uname, setUname] = React.useState("");
    const [u, setU] = React.useState("abcd");

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
                        src="/broken-image.jpg" 
                        sx={{ width: 150, height: 150}}
                    />
                    <Button variant="contained" disableElevation uppercase={false}>Upload new photo</Button>
                </Stack>

                {/* Text Fields */}
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} width="70%">
                    <TextField
                        label="First Name"
                        defaultValue="First"
                        value={f ? userInfo.firstName : first}
                        onChange={(event) => { setF(""); setFirst(event.target.value);}}
                    />
                    <TextField
                        label="Last Name"
                        defaultValue="Last"
                        value={l ? userInfo.lastName: last}
                        onChange={(event) => {setLast(event.target.value)}}
                    />
                    <TextField
                        label="Username"
                        defaultValue="username"
                        value={userInfo.username}
                    />
                    <TextField
                        label="Email Address"
                        defaultValue="name@email.com"
                        value={userInfo.email}
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
                        <Button variant="contained" onClick={modifyData(first ? first : userInfo.firstName, last ? last : userInfo.lastName)}>Submit</Button>
                        <Button variant="contained" color="error" onClick={handleClickOpen}>Delete Account</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Confirm Account Action</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete you wander account? This action is permanent and cannot be reverse.
                                    If yes, please reenter your username and password.
                                </DialogContentText>
                                <TextField 
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter Username"
                                fullWidth
                                variant="standard"/>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter Password"
                                fullWidth
                                type="password"
                                variant="standard"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Delete Account</Button>
                            </DialogActions>
                        </Dialog>

                    </Stack>

                </Stack>
            </Stack>
        </Box>

    )
}
