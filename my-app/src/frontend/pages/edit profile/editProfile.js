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
import { deleteUser, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateEmail, updatePassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


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

    const modifyData = async (first, last, uname, email, oldpassword, password) => {
        var userRef = db.collection('users').doc(email);

        if ((password != userInfo.password) && (password)) {
            signInWithEmailAndPassword(auth, auth.currentUser.email, oldpassword);
            String(password);
            if (password.length < 6) {
                alert("Weak Password! Please try again!");
                return;
            }
            updatePassword(auth.currentUser, password);
            userRef.set({
                password: password
            }, {merge: true})
        } else {
            password = oldpassword;
        }

        userRef.set({
            firstName: first,
            lastName: last,
            username: uname,
            email: email,
        }, {merge: true})

        if (email != auth.currentUser.email) {
            db.collection('users').doc(auth.currentUser.email).delete();
            updateEmail(auth.currentUser, email);
        }
        
    }

    const deleteUserFromBase = async (email, pass) => {
        await signInWithEmailAndPassword(auth, email, pass);
        await db.collection('users').doc(email).delete();
        //await signOut(auth);
        await deleteUser(auth.currentUser);
        await setOpen(false);
        navigate('/')
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

    const [email, setEmail] = React.useState("");
    const [e, setE] = React.useState("abcd");

    const [oldpass, setOldpass] = React.useState("");
    const [newpass, setNewpass] = React.useState("");

    const [deleteuser, setDeleteuser] = React.useState("");
    const [deletepass, setDeletepass] = React.useState("");

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
                        onChange={(event) => {setL(""); setLast(event.target.value)}}
                    />
                    <TextField
                        label="Username"
                        defaultValue="username"
                        value={u ? userInfo.username : uname}
                        onChange={(event) => {setU(""); setUname(event.target.value)}}
                    />
                    <TextField
                        label="Email Address"
                        defaultValue="name@email.com"
                        value={e ? userInfo.email : email}
                        onChange={(event) => {setE(""); setEmail(event.target.value)}}
                    />
                    <TextField
                        label="Old Password"
                        type="password"
                        onChange={(event) => {setOldpass(event.target.value)}}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        onChange={(event) => {setNewpass(event.target.value)}}
                    />
                    <TextField
                        label="Confirm Password"
                        type="password"
                    />

                    {/* Submit + Delete Buttons */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Button variant="contained" onClick={() => {modifyData(first ? first : userInfo.firstName, last ? last : userInfo.lastName, uname ? uname : userInfo.username, email ? email : userInfo.email, oldpass ? oldpass : userInfo.password, newpass ? newpass : "")}}>Submit</Button>
                        <Button variant="contained" color="error" onClick={handleClickOpen}>Delete Account</Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Confirm Account Action</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Are you sure you want to delete you wander account? This action is permanent and cannot be reverse.
                                    If yes, please reenter your email and password.
                                </DialogContentText>
                                <TextField 
                                autoFocus
                                margin="dense"
                                id="name"
                                onChange={(event) => {setDeleteuser(event.target.value)}}
                                label="Enter Email"
                                fullWidth
                                variant="standard"/>
                                <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                onChange={(event) => {setDeletepass(event.target.value)}}
                                label="Enter Password"
                                fullWidth
                                type="password"
                                variant="standard"/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={(event) => {deleteUserFromBase(deleteuser, deletepass)}}>Delete Account</Button>
                            </DialogActions>
                        </Dialog>

                    </Stack>

                </Stack>
            </Stack>
        </Box>

    )
}
