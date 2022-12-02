import React, { useEffect, useState } from "react";
import { auth, db, firestore } from "../../../firebase";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import firebase from "firebase/compat/app";
import playlistgeneration from "../../assets/playlistgeneration.wav";


//const ACCESS_TOKEN = "BQB_beh1V_60gRpN2LWPeYWv119TizcGm_vQQ3KGTBQrJyGQPNi6KDQ-GktV0XvBLQKKLVRMAN61F9C80lf61EvLJO6Nx-NjIRAjNvkucAv17_G8HUx0xB-jWeOGXqoMg1c-jpLiFP1fyHuMC3Jzomqs1ZafOHo-9F7tSYFba-eRdeJibSdPKt2v"
let trackInfo = null;
let trackURIs = "";
let showEmbed = false;
let embedSrc = "";

const sound = () => {
  var audio = new Audio(playlistgeneration);
  audio.play();
}

const modifyData2 = async (tok) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    var userRef = db.collection("Playlists").doc(currentUser?.email);
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Modifying Data");
    userRef
      ? userRef.set(
          { tok: firebase.default.firestore.FieldValue.arrayUnion(tok) },
          { merge: true }
        )
      : await new Promise((r) => setTimeout(r, 2000));
  } else {
    //    console.log("Waiting")
    await new Promise((r) => setTimeout(r, 2000));
    modifyData2();
  }
};

const sendToPastTrips2 = async (embedLink) => {
    const response = db.collection('users');
    const data = await response.get();
    const temp = []
    data.docs.forEach((item) =>{
        if (item.data().email == auth.currentUser.email) {
            item.ref.update({
                playlist: embedLink
            });
        }
    })
};

const sendToPastTrips = async (embedLink) => {
  const response = db.collection("pastTrips");
  const data = await response.get();
  const temp = [];
  data.docs.forEach((item) => {
    if (
      item.data().email == auth.currentUser.email &&
      item.data().latest == "true"
    ) {
      item.ref.update({
        playlist: embedLink,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
  });
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
    console.log(userInfo.real_access_token);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.spotify.com/v1/me", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(null);
    xhr.onload = () => {
      console.log("Logging XHR");
      console.log(xhr);
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        setPlaylistInfo(data);
        console.log("Logging Playlist Info");
        console.log(playlistInfo);
      }
    };
  };

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
    sound();
    if (userInfo == undefined) {
      handleGetPlaylists2();
    }
    console.log(userInfo.real_access_token);
    let xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.spotify.com/v1/users/" + playlistInfo.id + "/playlists",
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(
      JSON.stringify({ name: "WanderPlaylist", description: "MadeByWander" })
    );
    xhr.onload = () => {
      if (xhr.status == 201) {
        console.log("STATUS 201!!");
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        playlistID = data.id;
        console.log(playlistID);
        setPlaylistInfo2(data);
        console.log("Logging Playlist Info");
        console.log(playlistInfo2);

        handleGetPlaylists3();
      }
    };
  };

  const [playlistInfo3, setPlaylistInfo3] = useState("");
  const handleGetPlaylists3 = () => {
    if (userInfo == undefined) {
      getData();
      handleGetPlaylists3();
    }

    let timeInMinutes = 0;
    let rawTime = userInfo.duration;
    if (rawTime.includes("day")) {
      timeInMinutes = parseInt(rawTime.substring(0,1))*24*60;
      timeInMinutes += parseInt(rawTime.substring(6,8))*60;
    } else if (rawTime.includes("hour")) {
      timeInMinutes = parseInt(rawTime.substring(0,2))*60;
      timeInMinutes += parseInt(rawTime.substring(7,9));
    } else {
      timeInMinutes = parseInt(rawTime.substring(0,2));
    }

    console.log("LOGGING TOTAL MINUTES")
    console.log(timeInMinutes);

    let totalTracks = Math.ceil(timeInMinutes / 3);
    let genereQuota = Math.ceil(totalTracks*0.5);
    let moodQuota = Math.ceil(totalTracks*0.3);
    let artistQuota = Math.ceil(totalTracks*0.2);
    let partyQuota = Math.ceil(totalTracks*0.2);
    let occasionQuota = Math.ceil(totalTracks*0.2);

    let genere = userInfo2.quiz_ans.split(",")[0];
    let mood = userInfo2.quiz_ans.split(",")[1];
    let artist = userInfo2.quiz_ans.split(",")[2];
    let party = userInfo2.quiz_ans.split(",")[3];
    let occasion = userInfo2.quiz_ans.split(",")[4];

//    console.log("Logging Genere");
//    console.log(genere);

    if (mood == "Happy") {
      mood = "https://api.spotify.com/v1/playlists/" + "0fYt00xYXzgrDukvSEs5Qx"
    } else if (mood == "Romantic") {
      mood = "https://api.spotify.com/v1/playlists/" + "7tLigefihGnoZi6FRRIANU"
    } else if (mood == "Sad") {
      mood = "https://api.spotify.com/v1/playlists/" + "6nxPNnmSE0d5WlplUsa5L3"
    } else if (mood == "Angry") {
      mood = "https://api.spotify.com/v1/playlists/" + "457PRAhJMUXaS8s6Evh6Hd"
    } else if (mood == "Depressing") {
      mood = "https://api.spotify.com/v1/playlists/" + "6O1ZnUG2mtmeEqxxPa5OWn"
    } else if (mood == "Energetic") {
      mood = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DWZixSclZdoFE"
    }


    if (artist == "Taylor Swift") {
      artist = "https://api.spotify.com/v1/playlists/" + "6kh8X00EqGovzCJeYyWVTJ"
    } else if (artist == "Kanye West") {
      artist = "https://api.spotify.com/v1/playlists/" + "6gRTouHzpVI3f0kYwoLqOp"
    } else if (artist == "Lil Nas X") {
      artist = "https://api.spotify.com/v1/playlists/" + "0Hy7NA1dI7JKptUO3eFu0g"
    } else if (artist == "Drake") {
      artist = "https://api.spotify.com/v1/playlists/" + "6m34dZU9UdvhxXmna0la3f"
    } else if (artist == "Ariana Grande") {
      artist = "https://api.spotify.com/v1/playlists/" + "22HQX0p10rSJFXjguPwlOO"
    } else if (artist == "Doja Cat") {
      artist = "https://api.spotify.com/v1/playlists/" + "3HZxY0lLYx5twHN9jX16Nm"
    } else if (artist == "Nicki Minaj") {
      artist = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX6M8JqiGAfn5"
    } else if (artist == "BTS") {
      artist = "https://api.spotify.com/v1/playlists/" + "5CT4Amy0moL1d9RSQ9TP3f"
    } else if (artist == "Blackpink") {
      artist = "https://api.spotify.com/v1/playlists/" + "4HBAjSJ6l7gbrshF2dYUwe"
    }

    if (party == "Family") {
      party = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DWTJ0ewkTmTo2"
    } else if (party == "Friends") {
      party = "https://api.spotify.com/v1/playlists/" + "03mOswiqIwvBG1mjKniU2Y"
    } else if (party == "Classmates") {
      party = "https://api.spotify.com/v1/playlists/" + "3cmy3ZLtbqULbmgcTeAkHl"
    } else if (party == "Colleagues") {
      party = "https://api.spotify.com/v1/playlists/" + "0mXaFQBCsxvFxn8UBV6Zsx"
    } else if (party == "Lover") {
      party = "https://api.spotify.com/v1/playlists/" + "345R292ACZwR9Hmi7ZDVo8"
    } else if (party == "Enemy") {
      party = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1EQpj7X7UK8OOF"
    }

    if (occasion == "Vacation") {
      occasion = "https://api.spotify.com/v1/playlists/" + "1BkKoTWcynj0X97J1rVVfA"
    } else if (occasion == "Road Trip") {
      occasion = "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX9wC1KY45plY"
    } else if (occasion == "Team Bonding") {
      occasion = "https://api.spotify.com/v1/playlists/" + "1MB1EkfGa1UbcJ2IOFNQIA"
    } else if (occasion == "Going home") {
      occasion = "https://api.spotify.com/v1/playlists/" + "6ZtZhzg2cyxs5Nt91BRR8F"
    } else if (occasion == "Corporate retreat") {
      occasion = "https://api.spotify.com/v1/playlists/" + "0MUmiZVqpajTVbwzVUHYxD"
    } else if (occasion == "Field trip") {
      occasion = "https://api.spotify.com/v1/playlists/" + "1ZxPqx1O8D58l7xECu8zMm"
    }

    if (genere == "Pop") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DXa2PvUpywmrr";
    } else if (genere == "Rap") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX0XUsuxWHRQd";
    } else if (genere == "R&B") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX4SBhb3fqCJd";
    } else if (genere == "Country") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX1lVhptIYRda";
    } else if (genere == "EDM") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "2e3dcRuo9uDH6qD3NOGKAL";
    } else if (genere == "Hip Hop") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX6GwdWRQMQpq";
    } else if (genere == "Jazz") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DX7YCknf2jT6s";
    } else if (genere == "Classical") {
      genere =
        "https://api.spotify.com/v1/playlists/" + "37i9dQZF1DWWEJlAGA9gs0";
    }

    console.log(userInfo.real_access_token);
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", genere, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(null);
    xhr.onload = () => {
      console.log("Logging XHR");
      console.log(xhr);
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        console.log(genereQuota);
        console.log(data.tracks.items.length);
        trackInfo = data.tracks.items;
        
        let indexVar = 0;
        if (genereQuota > trackInfo.length) {genereQuota = trackInfo.length}
        var arr = new Array(genereQuota).fill(-1);
        while (indexVar < genereQuota) {
          if (genereQuota == trackInfo.length) {
            arr[indexVar] = indexVar;
            indexVar++;
            continue;
          }
          var r = Math.floor(Math.random() * genereQuota);
          if (arr.indexOf(r) === -1) {
            arr[indexVar] = r;
            indexVar++;
          }
        }

        let index = 0;
        console.log("Logging ARR");
        console.log(arr);

        trackURIs = "";
        while (index < genereQuota) {
          trackURIs += trackInfo[arr[index]].track.uri + "%2C";
          index++;
        }
        trackURIs.replace(":", "%3A");
        console.log("Logging Track URIs");
        console.log(trackURIs);
        setPlaylistInfo3(data);
        console.log("Logging Playlist Info");
        console.log(playlistInfo3);
        //handleGetPlaylists5(mood, moodQuota, party, partyQuota, occasion, occasionQuota, artist, artistQuota);
        handleGetPlaylists6(party, partyQuota, occasion, occasionQuota, artist, artistQuota, mood, moodQuota);
      }
    };
  };

  const handleGetPlaylists5 = (genere, genereQuota, party, partyQuota, occasion, occasionQuota, artist, artistQuota) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", genere, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(null);
    xhr.onload = () => {
      console.log("Logging XHR");
      console.log(xhr);
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        console.log(genereQuota);
        console.log(data.tracks.items.length);
        trackInfo = data.tracks.items;
        
        let indexVar = 0;
        if (genereQuota > trackInfo.length) {genereQuota = trackInfo.length}
        var arr = new Array(genereQuota).fill(-1);
        while (indexVar < genereQuota) {
          if (genereQuota == trackInfo.length) {
            arr[indexVar] = indexVar;
            indexVar++;
            continue;
          }
          var r = Math.floor(Math.random() * genereQuota);
          if (arr.indexOf(r) === -1) {
            arr[indexVar] = r;
            indexVar++;
          }
        }

        let index = 0;
        console.log("Logging ARR");
        console.log(arr);

        //trackURIs = "";
        while (index < genereQuota) {
          trackURIs += trackInfo[arr[index]].track.uri + "%2C";
          index++;
        }
        trackURIs.replace(":", "%3A");
        console.log("Logging Track URIs");
        console.log(trackURIs);
        setPlaylistInfo3(data);
        console.log("Logging Playlist Info");
        console.log(playlistInfo3);
        handleGetPlaylists4();
        //handleGetPlaylists6(party, partyQuota, occasion, occasionQuota, artist, artistQuota);
      }
    };
  }

  const handleGetPlaylists6 = (genere, genereQuota, occasion, occasionQuota, artist, artistQuota, mood, moodQuota) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", genere, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(null);
    xhr.onload = () => {
      console.log("Logging XHR");
      console.log(xhr);
      if (xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        console.log(data);
        console.log(genereQuota);
        console.log(data.tracks.items.length);
        trackInfo = data.tracks.items;
        
        let indexVar = 0;
        if (genereQuota > trackInfo.length) {genereQuota = trackInfo.length}
        var arr = new Array(genereQuota).fill(-1);
        while (indexVar < genereQuota) {
          if (genereQuota == trackInfo.length) {
            arr[indexVar] = indexVar;
            indexVar++;
            continue;
          }
          var r = Math.floor(Math.random() * genereQuota);
          if (arr.indexOf(r) === -1) {
            arr[indexVar] = r;
            indexVar++;
          }
        }

        let index = 0;
        console.log("Logging ARR");
        console.log(arr);

        //trackURIs = "";
        while (index < genereQuota) {
          trackURIs += trackInfo[arr[index]].track.uri + "%2C";
          index++;
        }
        trackURIs.replace(":", "%3A");
        console.log("Logging Track URIs");
        console.log(trackURIs);
        setPlaylistInfo3(data);
        console.log("Logging Playlist Info");
        console.log(playlistInfo3);
        handleGetPlaylists5(mood, moodQuota, genere, genereQuota, occasion, occasionQuota, artist, artistQuota);
        //handleGetPlaylists4();
      }
    };
  }

  const [playlistInfo4, setPlaylistInfo4] = useState("");
  const handleGetPlaylists4 = () => {
    getData();
    if (userInfo == undefined) {
      handleGetPlaylists4();
    }
    console.log(userInfo.real_access_token);
    let xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      "https://api.spotify.com/v1/playlists/" +
        playlistID +
        "/tracks?uris=" +
        trackURIs,
      true
    );
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " + userInfo.real_access_token
    );
    xhr.send(null);
    xhr.onload = () => {
      if (xhr.status == 201) {
        console.log("STATUS 201!!");
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
        sendToPastTrips2(embedSrc);
        //modifyData2(playlistID);
        sendToPastTrips(embedSrc);
      }
    };
  };

  /*
    useEffect(() => {
        embedSrc = false;
    }, [])
    */

  return (
    <>
      <Button
        variant="contained"
        onClick={handleGetPlaylists2}
        sx={{ width: 250, height: 35, margin: 2 }}
      >
        Generate Custom Playlist
      </Button>

      {showEmbed ? (
        <iframe src={embedSrc} width="100%" height={700}></iframe>
      ) : (
        <></>
      )}
      {(showEmbed = false)}
    </>
  );
};

export default SpotifyGetPlaylists;
