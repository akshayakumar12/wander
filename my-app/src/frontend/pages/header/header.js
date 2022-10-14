import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
//import Menu from '@mui/material/Menu';
import Logo from '../wander logo.png'
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react';
import { auth, db } from "../../../firebase"
import { onAuthStateChanged } from "firebase/auth";

const pages = ['Home', 'Past Trips', 'Profile', 'Settings'];

function Header() {
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
    
useEffect(()=> {
    onAuthStateChanged(auth, () => {
        getData();
    })
}, []) 

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background: '#f6eae2'}}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon sx={{color: '#023a7e'}} />
            </IconButton>
            <img src={Logo} alt="Brand Logo" height={75} />

            <Avatar 
                src={userInfo?.profilePicture}
                sx={{ marginLeft: "auto" }}
            />
            </Toolbar>
        </AppBar>
        </Box>


    )

 
}
export default Header;
