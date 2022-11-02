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
        xhr.open("GET", "https://api.spotify.com/v1/me/top/artists", true);
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
            <Stack spacing={2} justifyContent="center" direction="row">
                {!playlistInfo?
                <Avatar variant="square"
                    src={""}
                    sx={{ width: 150, height: 150 }}
                />
                : <Avatar variant="square"
                src={playlistInfo.items[0].images[0].url}
                sx={{ width: 150, height: 150 }}
                />}

                {!playlistInfo?
                <Avatar variant="square"
                    src={""}
                    sx={{ width: 150, height: 150 }}
                />
                : <Avatar variant="square"
                src={playlistInfo.items[1].images[0].url}
                sx={{ width: 150, height: 150 }}
                />}
                
                {!playlistInfo?
                <Avatar variant="square"
                    src={""}
                    sx={{ width: 150, height: 150 }}
                />
                : <Avatar variant="square"
                src={playlistInfo.items[2].images[0].url}
                sx={{ width: 150, height: 150 }}
                />}
                
                {!playlistInfo?
                <Avatar variant="square"
                    src={""}
                    sx={{ width: 150, height: 150 }}
                />
                : <Avatar variant="square"
                src={playlistInfo.items[3].images[0].url}
                sx={{ width: 150, height: 150 }}
                />}
                
                {!playlistInfo?
                <Avatar variant="square"
                    src={""}
                    sx={{ width: 150, height: 150 }}
                />
                : <Avatar variant="square"
                src={playlistInfo.items[4].images[0].url}
                sx={{ width: 150, height: 150 }}
                />}
            </Stack>
        </Box>
    )
}

export default SpotifyGetPlaylists