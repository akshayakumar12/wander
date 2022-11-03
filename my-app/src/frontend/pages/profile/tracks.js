import React, {useEffect, useState} from "react";
import {auth, db} from "../../../firebase"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";



//const ACCESS_TOKEN = "BQB_beh1V_60gRpN2LWPeYWv119TizcGm_vQQ3KGTBQrJyGQPNi6KDQ-GktV0XvBLQKKLVRMAN61F9C80lf61EvLJO6Nx-NjIRAjNvkucAv17_G8HUx0xB-jWeOGXqoMg1c-jpLiFP1fyHuMC3Jzomqs1ZafOHo-9F7tSYFba-eRdeJibSdPKt2v"

const SpotifyGetPlaylists = () => {
    
    const [getDataBool, setDataBool] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const getData = async () => {
    console.log("Logging Data");
    const response = db.collection("users");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (item.data().email == auth.currentUser.email) {
        setUserInfo(item.data());
        console.log("Logging Current Token");
        console.log(userInfo);
        console.log(userInfo);
      }
    });
    };

    const [playlistInfo, setPlaylistInfo] = useState("");
    const handleGetPlaylists = () => {
        getData();
        if (userInfo == undefined) {
            handleGetPlaylists();
        }
        console.log(userInfo.real_access_token)
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.spotify.com/v1/me/top/tracks", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(null);
        xhr.onload = () => {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                setPlaylistInfo(data);
                console.log("Logging Playlist Info");
                console.log(playlistInfo);
            }
        }
    }

    if (!userInfo) {
        setTimeout(getData, 1000);
    }

    if (!playlistInfo) {
        setTimeout(handleGetPlaylists, 1000);
//        handleGetPlaylists();
    }
    

    return (
        <Box>
            <Stack spacing={2} justifyContent="center" alignItems="center" direction="column">
                {/*
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[0].name}</h4>}

                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[1].name}</h4>}
                
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[2].name}</h4>}
                
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[3].name}</h4>}
                
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[4].name}</h4>}
                */
                }
                <h2>Your Top Tracks</h2>
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[0].name}</h4>}
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[1].name}</h4>}
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[2].name}</h4>}
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[3].name}</h4>}
                {!playlistInfo?
                <></>
                : <h4>{playlistInfo.items[4].name}</h4>}
            </Stack>
        </Box>
    )
}

export default SpotifyGetPlaylists