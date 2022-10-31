import React, {useState} from "react";
import {auth, db} from "../../../firebase"

//const ACCESS_TOKEN = "BQB_beh1V_60gRpN2LWPeYWv119TizcGm_vQQ3KGTBQrJyGQPNi6KDQ-GktV0XvBLQKKLVRMAN61F9C80lf61EvLJO6Nx-NjIRAjNvkucAv17_G8HUx0xB-jWeOGXqoMg1c-jpLiFP1fyHuMC3Jzomqs1ZafOHo-9F7tSYFba-eRdeJibSdPKt2v"

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

    const handleGetPlaylists = () => {
        getData();
        if (userInfo == undefined) {
            handleGetPlaylists();
        }
        console.log(userInfo.real_access_token)
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://api.spotify.com/v1/me/playlists", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + userInfo.real_access_token);
        xhr.send(null);
        xhr.onload = () => {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
            }
        }
    }

    return <button onClick={handleGetPlaylists}>Get Playlists</button>
}

export default SpotifyGetPlaylists