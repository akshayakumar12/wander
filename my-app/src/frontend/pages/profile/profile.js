import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Header from '../header/header'
import {useEffect, useState} from 'react';
import { auth, db } from "../../../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth";
import {useNavigate } from 'react-router-dom';
import {getTokenFromUrl} from "../../../backend/pages/profile/connectSpotify"
import SpotifyWebApi from 'spotify-web-api-js'
import { collection, getDocs } from "firebase/firestore";

function Profile () {

    const CLIENT_ID = "cd4b2dc4fd9a40d08077c8e883502bc9"
    const REDIRECT_URI = "http://localhost:3000/profile"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state"
    ]
    

    const spotify = new SpotifyWebApi();
    const [spotifyToken, setSpotifyToken] = useState("");

    useEffect(() => {
        const _spotifyToken = getTokenFromUrl().access_token;
        window.location.hash = "";

        if (_spotifyToken) {
            setSpotifyToken(_spotifyToken);
            spotify.setAccessToken(_spotifyToken);
            window.localStorage.setItem("spotifyToken", _spotifyToken)
        }
    })

    const logout = () => {
        setSpotifyToken("")
        window.localStorage.removeItem("spotifyToken")
        Profile()
    }

    const navigate = useNavigate()
    const logout_fb = async () => {
        await signOut(auth)
        navigate('/')
    }

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
            setUserInfo([...userInfo, item.data()])
        })
    }
    useEffect(()=> {
        getData();
    }, [])

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
                        <p>email address: {user.email}</p>
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
                    {!spotifyToken ?
                        <Button variant="contained" href= {`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`}>Connect to Spotify</Button>
                        : <Button variant="contained" onClick={logout} color="error">Disconnect from Spotify</Button>
                    }
                </Stack>

            </Stack>

            <Button onClick={logout_fb} style={{position: 'absolute', bottom: 40}}>Logout</Button>
        </Box>
    )
}

export default Profile;