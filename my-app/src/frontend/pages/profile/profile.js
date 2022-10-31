import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Header from "../header/header";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getTokenFromUrl } from "../../../backend/pages/profile/connectSpotify";
import SpotifyWebApi from "spotify-web-api-js";
import { collection, getDocs } from "firebase/firestore";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CreateIcon from "@mui/icons-material/Create";
import SettingsIcon from "@mui/icons-material/Settings";

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

  const spotify = new SpotifyWebApi();
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

  const settings_click = () => {
    navigate("/settings");
    handleClick();
  };

  const edit_profile_click = () => {
    if (auth.currentUser) {
      navigate("/editProfile");
    }
    handleClick();
  };

  const pastQuizPref_click = () => {
    navigate("/quizhistory");
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
    onAuthStateChanged(auth, () => {
      getData();
    });
  }, []);

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
          style={{
            backgroundColor: "#f3f5f9",
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
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon></MoreHorizIcon>
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

        {/* Spotify Buttons */}
        <Stack spacing={2} justifyContent="center" direction="row">
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

          <Button variant="contained" onClick={pastQuizPref_click}>
            Past Quiz Preferences
          </Button>
        </Stack>
      </Stack>

      <Button onClick={logout_fb} style={{ position: "absolute", bottom: 40 }}>
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
