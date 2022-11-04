import React, {useEffect, useState} from "react";
import {auth, db, firestore} from "../../../firebase"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import firebase from 'firebase/compat/app'

//const ACCESS_TOKEN = "BQB_beh1V_60gRpN2LWPeYWv119TizcGm_vQQ3KGTBQrJyGQPNi6KDQ-GktV0XvBLQKKLVRMAN61F9C80lf61EvLJO6Nx-NjIRAjNvkucAv17_G8HUx0xB-jWeOGXqoMg1c-jpLiFP1fyHuMC3Jzomqs1ZafOHo-9F7tSYFba-eRdeJibSdPKt2v"
let trackInfo = null;
let trackURIs = "";
let showEmbed = false;
let embedSrc = "";

const modifyData2 = async (tok) => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      var userRef = db.collection("Playlists").doc(currentUser?.email);
      await new Promise(r => setTimeout(r, 2000));
      console.log("Modifying Data");
      userRef ? userRef.set(
        {tok : firebase.default.firestore.FieldValue.arrayUnion(tok)},
        {merge: true}
      ) : await new Promise(r => setTimeout(r, 2000));
    } else {
  //    console.log("Waiting")
      await new Promise(r => setTimeout(r, 2000));
      modifyData2();
    }
};

const sendToPastTrips = async (embedLink) => {
    const response = db.collection('pastTrips');
    const data = await response.get();
    const temp = []
    data.docs.forEach((item) =>{
        if (item.data().email == auth.currentUser.email && (item.data().latest == "true")) {
            item.ref.update({
                playlist: embedLink,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    })
};

const SpotifyGetPlaylists = () => {
    
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


    const [userInfo2, setUserInfo2] = useState("");
    const getData2 = async () => {
    console.log("Logging Data");
    const response = db.collection("quizAnswers");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (item.data().quiz_id == auth.currentUser.email) {
        setUserInfo2(item.data());
        console.log("Logging Current Token 2");
        console.log(userInfo2);
        console.log(userInfo2);
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
        xhr.open("GET", "https://api.spotify.com/v1/me", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(null);
        xhr.onload = () => {
            console.log("Logging XHR");
            console.log(xhr)
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                setPlaylistInfo(data);
                console.log("Logging Playlist Info");
                console.log(playlistInfo);
            }
        }
    }

    // This part is getting the access token for the API Calls.
    if (!userInfo) {
        setTimeout(getData, 1000);
    }

    if (!userInfo2) {
        setTimeout(getData2, 1000);
    }

    // This part is getting the User ID for creating/adding to playlist.
    if (!playlistInfo) {
        setTimeout(handleGetPlaylists, 1000);
    }
    
    let playlistID = "";

    const [playlistInfo2, setPlaylistInfo2] = useState("");
    const handleGetPlaylists2 = () => {
        showEmbed = false;
        getData();
        if (userInfo == undefined) {
            handleGetPlaylists2();
        }
        console.log(userInfo.real_access_token)
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.spotify.com/v1/users/" + playlistInfo.id + "/playlists", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(JSON.stringify({ "name": "WanderPlaylist", "description": "MadeByWander" }));
        xhr.onload = () => {
            if (xhr.status == 201) {
                console.log("STATUS 201!!")
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                playlistID = data.id;
                console.log(playlistID);
                setPlaylistInfo2(data);
                console.log("Logging Playlist Info");
                console.log(playlistInfo2);
                
                handleGetPlaylists3();
            }
        }
    }


    const [playlistInfo3, setPlaylistInfo3] = useState("");
    const handleGetPlaylists3 = () => {
        if (userInfo == undefined) {
            getData();
            handleGetPlaylists3();
        }

        let genere = userInfo2.quiz_ans.split(",")[0];
        console.log("Logging Genere");
        console.log(genere);
        if (genere == "Pop") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DXa2PvUpywmrr";
        } else if (genere == "Rap") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX0XUsuxWHRQd";
        } else if (genere == "R&B") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX4SBhb3fqCJd";
        } else if (genere == "Country") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX1lVhptIYRda";
        } else if (genere == "EDM") {
            genere = "https://api.spotify.com/v1/playlists/" + "2e3dcRuo9uDH6qD3NOGKAL";
        } else if (genere == "Hip Hop") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX6GwdWRQMQpq";
        } else if (genere == "Jazz") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX7YCknf2jT6s";
        } else if (genere == "Classical") {
            genere = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DWWEJlAGA9gs0";
        }

        console.log(userInfo.real_access_token)
        let xhr = new XMLHttpRequest();
        xhr.open("GET", genere, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(null);
        xhr.onload = () => {
            console.log("Logging XHR");
            console.log(xhr)
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                trackInfo = data.tracks.items;
                
                var arr = [];
                while(arr.length < 10){
                    var r = Math.floor(Math.random() * 50) + 1;
                    if(arr.indexOf(r) === -1) arr.push(r);
                }
                let index = 0;
                console.log("Logging ARR");
                console.log(arr);

                trackURIs = "";
                while (index < 10) {
                    trackURIs += trackInfo[arr[index]].track.uri + "%2C";
                    index++;
                }
                trackURIs.replace(":", "%3A")
                console.log("Logging Track URIs");
                console.log(trackURIs);
                setPlaylistInfo3(data);
                console.log("Logging Playlist Info");
                console.log(playlistInfo3);
                handleGetPlaylists4();
            }
        }
    }


    const [playlistInfo4, setPlaylistInfo4] = useState("");
    const handleGetPlaylists4 = () => {
        getData();
        if (userInfo == undefined) {
            handleGetPlaylists4();
        }
        console.log(userInfo.real_access_token)
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.spotify.com/v1/playlists/" + playlistID +"/tracks?uris=" + trackURIs, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(null);
        xhr.onload = () => {
            if (xhr.status == 201) {
                console.log("STATUS 201!!")
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                setPlaylistInfo4(data);
                console.log("Logging Playlist Info");
                console.log(playlistInfo4);
                showEmbed = true;
                embedSrc = "";
                embedSrc += "https://open.spotify.com/embed/playlist/";
                embedSrc += playlistID;
                embedSrc += "?utm_source=generator";
                console.log("Logging Embed Link");
                console.log(embedSrc);
                //modifyData2(playlistID);
                sendToPastTrips(embedSrc);
            }
        }
    }

    /*
    useEffect(() => {
        embedSrc = false;
    }, [])
    */

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
                { /*
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
                */}

                <Button variant="contained" onClick={handleGetPlaylists2}>Generate Custom Playlist</Button>
            </Stack>
            {showEmbed ?
            <iframe
                src={embedSrc}
                width="100%"
                height={700}
            ></iframe> : <></>
            }
            {showEmbed = false}
        </Box>
    )
}

export default SpotifyGetPlaylists