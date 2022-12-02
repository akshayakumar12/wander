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
import loginchime from "../../assets/loginchime.mp3";


const TOKEN = "https://accounts.spotify.com/api/token";
const REDIRECT_URI = "http://localhost:3000/spotifyData";
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

const sound = () => {
  var audio = new Audio(loginchime);
  audio.play();
}

const handleClick2 = () => {
  sound();
  window.setTimeout(function() {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL}&response_type=code&show_dialog=true`;
  }, 1500);
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

function SpotifyData() {
  const CLIENT_ID = "cd4b2dc4fd9a40d08077c8e883502bc9";
  const REDIRECT_URI = "http://localhost:3000/spotifyData";
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
        {/* Title */}
        <Stack
          alignItems={"flex-start"}
          style={{ marginLeft: "50px", marginRight: "50px" }}
        >
          <h1>Your Spotify Data</h1>
        </Stack>
        <Stack
          alignItems={"center"}
          style={{ marginLeft: "50px", marginRight: "50px" }}
          spacing={2}
        >
          <Button variant="contained" onClick={handleClick2}>
            Connect to Spotify
          </Button>
          <Button variant="contained" onClick={handleDisconnect}>
            Disconnect from Spotify
          </Button>
        </Stack>

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
      </Stack>
    </Box>
  );
}

export default SpotifyData;
