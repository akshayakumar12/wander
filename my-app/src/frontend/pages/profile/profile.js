import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Header from "../header/header";
import Test from "./Test";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getTokenFromUrl } from "../../../backend/pages/profile/connectSpotify";
import { collection, getDocs } from "firebase/firestore";
import { Buffer } from "buffer";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";
import Tracks from "./tracks";
import LogoutIcon from "@mui/icons-material/Logout";

const TOKEN = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = "http://localhost:3000/profile";
const real_access_token = "";
const real_refresh_token = "";
const CLIENT_ID = "cd4b2dc4fd9a40d08077c8e883502bc9";
const CLEINT_SECRET = "5e69ca6de47f4d9589d9d05441a28cfe";

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-modify-private",
  "playlist-modify-public",
];

const SCOPES_URL = SCOPES.join("%20");

const handleClick2 = () => {
  window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;
};

const handleDisconnect = () => {
  console.log("Removing Access Token");
  modifyData2("");
  console.log("Removing Refresh Token");
  modifyData3("");
  //  window.location.reload(false);
};

const modifyData2 = async (tok) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    var userRef = db.collection("users").doc(currentUser?.email);
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Modifying Data");
    userRef
      ? userRef.set({ real_access_token: tok }, { merge: true })
      : await new Promise((r) => setTimeout(r, 2000));
  } else {
    //    console.log("Waiting")
    await new Promise((r) => setTimeout(r, 2000));
    modifyData2();
  }
};

const modifyData3 = async (tok) => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    var userRef = db.collection("users").doc(currentUser?.email);
    await new Promise((r) => setTimeout(r, 2000));
    console.log("Modifying Data");
    userRef
      ? userRef.set({ real_refresh_token: tok }, { merge: true })
      : await new Promise((r) => setTimeout(r, 2000));
  } else {
    //    console.log("Waiting")
    await new Promise((r) => setTimeout(r, 2000));
    modifyData3();
  }
};

const getSpotifyParams = (hash) => {
  const stringAfterHash = hash.substring(1);
  const paramsInUrl = stringAfterHash.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});

  return paramsSplitUp;
};

async function onPageLoad() {
  if (window.location.search.length > 0) {
    console.log("I should only print after button click");
    handleRedirect();
  }
}

const handleRedirect = () => {
  console.log("Handling redirect");
  let code = getCode();
  fetchAccessToken(code);
};

const fetchAccessToken = (code) => {
  console.log("Fetching Token");
  let body = "grant_type=authorization_code";
  body += "&code=" + code;
  body += "&redirect_uri=" + encodeURI(REDIRECT_URI);
  body += "&client_id=" + "cd4b2dc4fd9a40d08077c8e883502bc9";
  body += "&client_secret=5e69ca6de47f4d9589d9d05441a28cfe";
  callAuthApi(body);
};

const callAuthApi = (body) => {
  console.log("Calling API");
  let xhr = new XMLHttpRequest();

  const x = Buffer.from(CLIENT_ID + ":" + CLEINT_SECRET, "utf8").toString(
    "base64"
  );

  xhr.open("POST", TOKEN, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("Authorization", "Basic " + x);
  xhr.send(body);
  xhr.onload = async () => {
    console.log("Handling Response");
    console.log(xhr);
    if (xhr.status == 200) {
      console.log("Status 200!!");
      var data = JSON.parse(xhr.responseText);
      console.log(data);
      console.log(data.access_token);
      if (data.access_token != undefined) {
        console.log("modifying data");
        modifyData2(data.access_token);
      }
      if (data.refresh_token != undefined) {
        console.log("modifying data");
        modifyData3(data.refresh_token);
      }
      //      window.location.reload(false);
      //      return;
      onPageLoad();
    }
  };
};

/*
const callApi = (method, url, body) => {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + access_token);
  xhr.send(body);
  xhr.onload = () => {
    if (xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      console.log(data);
    }
  }
}
*/

/*
const handleAuthResp = () => {
  console.log("Handling Response");
  if (this.status == 200) {
    console.log("Status 200!!")
    var data = JSON.parse(this.responseText);
    if (data.access_token != undefined) {
      real_access_token = data.access_token;
      console.log("modifying data");
      modifyData2(real_access_token);
    }
    if (data.refresh_token != undefined) {
      real_refresh_token = data.refresh_token;
      console.log("modifying data")
      modifyData3(real_refresh_token);
    }

//    onPageLoad();
  }
}
*/
const getCode = () => {
  console.log("Getting Code");
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
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
    navigate("/quizhistory");
  };

  const spotifyData_click = () => {
    navigate("/spotifyData");
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

  useEffect(() => {
    //    handleRedirect();
    //    console.log("I should only print once")
    //    onPageLoad();
    console.log("Getting Data 260");
    getData();
    console.log("Loading Page 262");
    onPageLoad();
    console.log("Getting Data 264");
    getData();
  }, []);
  /*
  useEffect(() => {
    console.log("Logging UserInfo");
    console.log(userInfo);
    if (!userInfo) {
      console.log("I should only print once!")
      onPageLoad();
    }
  }, [])
*/
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } = getSpotifyParams(
        window.location.hash
      );
      //      modifyData(access_token);
      //      handleRedirect();
    }
  }, []);

  const modifyData = async (tok) => {
    var userRef = db.collection("users").doc(auth.currentUser.email);
    console.log("Modifying Data");
    userRef.set({ access_token: tok }, { merge: true });
  };

  const [token, setToken] = useState("");
  useEffect(() => {});

  /*
  const setAuthToken = async () => {
    var userRef = db.collections("users").doc(auth.currentUser.email)
    if (userRef.)
  }
  */

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  function handleClose() {
    setAnchorEl(null);
  }

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
          sx={{ backgroundColor: "cardBg.main" }}
          style={{
            //backgroundColor: "primary.contrastText",
            padding: "30px",
            marginLeft: "50px",
            marginRight: "50px",
            borderRadius: "16px",
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

          <Stack
            direction="row"
            alignItems="center"
            sx={{ position: "relative", bottom: 70, left: 15 }}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon
                sx={{
                  color: "primary.contrastText",
                }}
              ></MoreHorizIcon>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={edit_profile_click}>
                <CreateIcon></CreateIcon> Edit Profile
              </MenuItem>
              <MenuItem onClick={settings_click}>
                <SettingsIcon></SettingsIcon>Settings
              </MenuItem>
            </Menu>
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
          {
            //    <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=token&show_dialog=true`}>Click me</Button>
            //                    <Button variant="contained" href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`}>No, Click ME!</Button>
          }
          {/*
          <Button variant="contained" onClick={handleClick2}>
            Connect to Spotify
          </Button>
          <Button variant="contained" onClick={handleDisconnect}>
            Disconnect from Spotify
          </Button>
          */}
          <Button variant="contained" onClick={spotifyData_click}>
            Your Spotify Data
          </Button>
          <Button variant="contained" onClick={pastQuizPref_click}>
            Past Quiz Preferences
          </Button>
        </Stack>
      </Stack>

      {/*}
      {userInfo.real_access_token ? (
        <>
          {" "}
          <h2>Your Top Artists</h2>
          <Stack spacing={2} justifyContent="center" direction="row">
            <Test />{" "}
          </Stack>
          <Stack spacing={2} justifyContent="center" direction="row">
            <Tracks />{" "}
          </Stack>
        </>
      ) : (
        <></>
      )}
      */}

      <Stack
        direction="row"
        alignItems="center"
        sx={{ position: "absolute", bottom: 40, left: "50%" }}
      >
        <LogoutIcon sx={{ color: "#DE6600" }} />
        <Button onClick={logout_fb} sx={{ color: "#DE6600" }}>
          Logout
        </Button>
      </Stack>
      {
        //  <Test />
      }
    </Box>
  );
}

export default Profile;
