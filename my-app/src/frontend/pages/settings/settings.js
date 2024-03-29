import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Button, FormControlLabel, FormGroup, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../../../firebase";
import ToggleSend from "../../../backend/settings/toggle";
import { ColorModeContext } from "../../../color-context";

export default function Settings() {
  const colorMode = React.useContext(ColorModeContext);

  //const [user, setUser] = useState("");

  const [userInfo, setUserInfo] = useState("");

  const [email, setEmail] = React.useState("");
  const [e, setE] = React.useState("abcd");

  const [explicit, setExplicit] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const explicitChecked = () => {
    setExplicit((prev) => !prev);
    ToggleSend(auth.currentUser.email, !explicit, checked);
  };

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const value = localStorage.getItem("theme");
    console.log("type: " + typeof value);
    console.log("value: " + value);
    value == "true" ? setChecked(true) : setChecked(false);
  });

  const toggleChecked = () => {
    setChecked((prev) => !prev);
    localStorage.setItem("theme", !checked);
    ToggleSend(auth.currentUser.email, explicit, !checked);
    //colorMode.toggleColorMode();
    console.log("check");
    console.log(colorMode.toggleColorMode);
    console.log(auth.currentUser.email.checked);
    window.location.reload();
  };

  const [oldpass, setOldpass] = React.useState("");
  const [newpass, setNewpass] = React.useState("");
  const modifyData = async (
    first,
    last,
    uname,
    email,
    oldpassword,
    password
  ) => {
    var userRef = db.collection("users").doc(email);

    if (password !== userInfo.password && password) {
      signInWithEmailAndPassword(auth, auth.currentUser.email, oldpassword);
      String(password);
      if (password.length < 6) {
        alert("Weak Password! Please try again!");
        return;
      }
      updatePassword(auth.currentUser, password);
      userRef.set(
        {
          password: password,
        },
        { merge: true }
      );
    } else {
      password = oldpassword;
    }

    userRef.set(
      {
        firstName: first,
        lastName: last,
        username: uname,
        email: email,
      },
      { merge: true }
    );

    if (email !== auth.currentUser.email) {
      db.collection("users").doc(auth.currentUser.email).delete();
      updateEmail(auth.currentUser, email);
    }
  };
  return (
    <Box>
      {/* My Profile Title */}
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1 style={{ marginBottom: 5 }}>Settings</h1>
      </Stack>
      {/* Text Fields */}
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        width="70%"
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h3 align="left" style={{ marginBottom: 2 }}>
          Personalization
        </h3>
        <FormGroup style={{ margin: 0 }}>
          <FormControlLabel
            control={
              <Switch
                checked={explicit}
                onChange={explicitChecked}
                color="default"
              />
            }
            label="Explicit Content"
          ></FormControlLabel>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={toggleChecked}
                color="default"
              />
            }
            label={`${checked ? "Dark Mode" : "Light Mode"}`}
          ></FormControlLabel>
        </FormGroup>

        <h2 align="left">Account Information</h2>
        <TextField
          label="Email Address"
          defaultValue="name@email.com"
          value={e ? userInfo.email : email}
          onChange={(event) => {
            setE("");
            setEmail(event.target.value);
          }}
        />
        <TextField
          label="Old Password"
          type="password"
          onChange={(event) => {
            setOldpass(event.target.value);
          }}
        />
        <TextField
          label="New Password"
          type="password"
          onChange={(event) => {
            setNewpass(event.target.value);
          }}
        />
        <TextField label="Confirm Password" type="password" />
        {/* Submit + Delete Buttons */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            onClick={() => {
              modifyData(
                email ? email : userInfo.email,
                oldpass ? oldpass : userInfo.password,
                newpass ? newpass : ""
              );
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
