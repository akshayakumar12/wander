import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Header from "../header/header";
import Test from "./Test"
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getTokenFromUrl } from "../../../backend/pages/profile/connectSpotify";
import { collection, getDocs } from "firebase/firestore";

const getSpotifyParams = (hash) => {
  const stringAfterHash = hash.substring(1);
  const paramsInUrl = stringAfterHash.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    console.log(currentValue)
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp
};

function Profile() {
  const CLIENT_ID = "cd4b2dc4fd9a40d08077c8e883502bc9";
  const REDIRECT_URI = "http://localhost:3000/profile";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
  ];
  // client_secret = 5e69ca6de47f4d9589d9d05441a28cfe

  const SCOPES_URL = SCOPES.join("%20");

  //const spotify = new SpotifyWebApi();
  /*
  const [spotifyToken, setSpotifyToken] = useState("");

  useEffect(() => {
    const _spotifyToken = getTokenFromUrl().access_token;
    window.location.hash = "";

    if (_spotifyToken) {
      setSpotifyToken(_spotifyToken);
      spotify.setAccessToken(_spotifyToken);
      window.localStorage.setItem("spotifyToken", _spotifyToken);
    }
  });

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("spotifyToken");
    Profile();
  };
  */
  const settings_click = () => {
    navigate("/settings");
  };

  const edit_profile_click = () => {
    if (auth.currentUser) {
      navigate("/editProfile");
    }
  };

  const pastQuizPref_click = () => {
    navigate("/pastQuizPreferences");
  };

  const navigate = useNavigate();
  const logout_fb = async () => {
    await signOut(auth);
    navigate("/");
  };

  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
      } else {
        navigate("/");
      }
    });
  }, []);

  const [userInfo, setUserInfo] = useState("");
  const getData = async () => {
    const response = db.collection("users");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (item.data().email == auth.currentUser.email) {
        setUserInfo(item.data());
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if(window.location.hash) {
      const {
        access_token,
        expires_in,
        token_type,
      } = getSpotifyParams(window.location.hash);
      modifyData(access_token);
    }
  })

  const modifyData = async (tok) => {
    var userRef = db.collection("users").doc(auth.currentUser.email);
    console.log("Modifying Data");
    userRef.set(
      {access_token: tok},
      {merge: true}
    )
  };

  const [token, setToken] = useState("")
  useEffect(() => {
    
  })

  /*
  const setAuthToken = async () => {
    var userRef = db.collections("users").doc(auth.currentUser.email)
    if (userRef.)
  }
  */
  return (
    <Box>
      <Stack spacing={2}>
        {/* My Profile Title */}
        <Stack
          alignItems={"flex-start"}
          style={{ marginLeft: "50px", marginRight: "50px" }}
        >
          <h1>My Profile</h1>
        </Stack>

        {/* Profile Box */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          style={{
            backgroundColor: "#f3f5f9",
            padding: "30px",
            marginLeft: "50px",
            marginRight: "50px",
          }}
        >
          {/* Profile Picture*/}
          <Box>
            <Avatar
              src={userInfo?.profilePicture}
              sx={{ width: 150, height: 150 }}
            />
          </Box>

          {/* User Information */}
          <Stack direction="column" spacing={1}>
            <h2>
              {userInfo?.firstName} {userInfo?.lastName}
            </h2>
            <p>@{userInfo?.username}</p>
            <p>{user.email}</p>
          </Stack>

          {/* Edit Profile and Settings Box */}

          <Stack spacing={2}>
            <Button
              onClick={edit_profile_click}
              variant="contained"
              style={{ backgroundColor: "#f3f5f9", color: "default" }}
            >
              Edit Profile
            </Button>

            <Button
              onClick={settings_click}
              variant="contained"
              style={{ backgroundColor: "#f3f5f9", color: "blue" }}
            >
              Settings
            </Button>
          </Stack>
        </Stack>

        {/* Spotify Buttons */}
        
        <Stack spacing={2} justifyContent="center" direction="row">
          {/*
          {!spotifyToken ? (
            <Button
              variant="contained"
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
                "%20"
              )}&response_type=${RESPONSE_TYPE}&show_dialog=true`}
              mt="4"
            >
              Connect to Spotify
            </Button>
          ) : (
            <Button variant="contained" onClick={logout} color="error">
              Disconnect from Spotify
            </Button>
          )}
          */}
          <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`}>Click me</Button>
          <Button variant="contained" onClick={pastQuizPref_click}>
            Past Quiz Preferences
          </Button>
        </Stack>
      </Stack>
  
      <Button onClick={logout_fb} style={{ position: "absolute", bottom: 40 }}>
        Logout
      </Button>
      <Test />
    </Box>
  );
}

export default Profile;
