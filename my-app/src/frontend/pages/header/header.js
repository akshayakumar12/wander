import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
//import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
//import AccountCircle from '@mui/icons-material/AccountCircle';
//import Switch from '@mui/material/Switch';
//import FormControlLabel from '@mui/material/FormControlLabel';
//import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//import Menu from '@mui/material/Menu';
import Logo from '../wander logo.png'
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react';
import { auth, db } from "../../../firebase"
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router';


const pages = ['Home', 'Past Trips', 'Profile', 'Settings'];

function Header() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState("");    

    const getData = async () => {
        const response = db.collection('users');
        const data = await response.get();
        data.docs.forEach(item=>{
            if (item.data().email === auth.currentUser.email) {
                setUserInfo(item.data())
            }
        })
    }
        
    useEffect(()=> {
        onAuthStateChanged(auth, () => {
            getData();
        })
    }, []) 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };


    function handleClose() {
        setAnchorEl(null);
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{background: '#f6eae2'}}>
                <Toolbar>

                    {/* Three Bar Menu Icon */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MenuIcon sx={{color: '#023a7e'}} />
                    </IconButton>
                    {/* Dropdown Menu */}
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => {navigate("/home"); handleClose();}}>Home</MenuItem>
                        <MenuItem onClick={() => {navigate("/pasttrips"); handleClose();}}>Past Trips</MenuItem>
                        <MenuItem onClick={() => {navigate("/profile"); handleClose();}}>Profile</MenuItem>
                        <MenuItem onClick={() => {navigate("/settings"); handleClose();}}>Settings</MenuItem>
                    </Menu>


                    {/* Logo */}
                    <img src={Logo} alt="Brand Logo" height={75} />

                    {/* Profile Picture */}
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
