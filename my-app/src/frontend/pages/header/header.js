import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../wander logo.png";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import WhiteLogo from "../../assets/White Logo.png";

function Header() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getData = async () => {
    const response = db.collection("users");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (item.data().email === auth.currentUser.email) {
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

  const logout_fb = async () => {
    await signOut(auth);
    navigate("/");
  };

  const [logo, setLogo] = useState(null);

  useEffect(() => {
    console.log("localStorage: " + localStorage.getItem("theme"));
    const mode = localStorage.getItem("theme");
    mode == "true" ? setLogo(WhiteLogo) : setLogo(Logo);
  });

  return (
    //<ThemeProvider theme={Theme}>
    <Box>
      <AppBar position="static" sx={{ background: "primary.main" }}>
        <Toolbar>
          {/* Three Bar Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon sx={{ color: "primary.contrastText" }} size="large" />
          </IconButton>
          {/* Dropdown Menu */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: {
                width: 240,
                flexShrink: 0,
                color: "primary.contrastText",
                backgroundColor: "sidebarColor.main",
                fontFamily: "Rubik",
                "& .MuiDrawer-paper": {
                  width: 240,
                  boxSizing: "border-box",
                },
              },
            }}
          >
            <List>
              <ListItem disablePadding id="text">
                <ListItemButton
                  onClick={() => {
                    navigate("/home");
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Home"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/profile");
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/pastTrips");
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <CardTravelIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Past Trips"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/settings");
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Settings"} />
                </ListItemButton>
              </ListItem>
            </List>
            {/* Logout List */}
            <List
              sx={{
                width: "100%",
                bottom: 0,
                position: "absolute",
                align: "center",
              }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    logout_fb();
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon>
                    {" "}
                    <LogoutIcon sx={{ color: "#DE6600" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<Box fontWeight="500">Logout</Box>}
                    sx={{ color: "#DE6600", fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

          {/* Logo */}

          <img
            //src={WhiteLogo}
            src={logo}
            alt="Brand Logo"
            height={75}
            onClick={() => {
              navigate("/home");
            }}
          />

          {/* Profile Picture */}
          <Avatar
            src={userInfo?.profilePicture}
            sx={{ marginLeft: "auto" }}
            onClick={() => {
              navigate("/profile");
            }}
          />
        </Toolbar>
      </AppBar>
    </Box>
    //</ThemeProvider>
  );
}
export default Header;
