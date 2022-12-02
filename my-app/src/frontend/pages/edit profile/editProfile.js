import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import * as React from "react";
import { DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState, useEffect } from "react";
import { auth, db, record, storage } from "../../../firebase";
import {
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../edit profile/editProfile.css";

export default function EditProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
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
      if (item.data().email === auth.currentUser.email) {
        setUserInfo(item.data());
      }
    });
  };

  const modifyData = async (
    first,
    last,
    uname,
    email,
    oldpassword,
    password,
    age,
    gender
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
        age: age,
        gender: gender,
      },
      { merge: true }
    );

    if (email !== auth.currentUser.email) {
      db.collection("users").doc(auth.currentUser.email).delete();
      updateEmail(auth.currentUser, email);
    }
  };

  const deleteUserFromBase = async (email, pass) => {
    await signInWithEmailAndPassword(auth, email, pass);
    await db.collection("users").doc(email).delete();
    //await signOut(auth);
    await deleteUser(auth.currentUser);
    await setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      getData();
    });
  }, []);

  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      var pattern = /image-*/;

      if (!file.type.match(pattern)) {
        alert("Please choose an image file.");
        return;
      }

      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const imageRef = ref(storage, auth.currentUser.uid + ".jpg");
    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setURL(url);
            db.collection("users").doc(auth.currentUser.email).set(
              {
                profilePicture: url,
              },
              { merge: true }
            );
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(url);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const submit = () => {
    handleUpload();

    modifyData(
      first ? first : userInfo.firstName,
      last ? last : userInfo.lastName,
      uname ? uname : userInfo.username,
      email ? email : userInfo.email,
      oldpass ? oldpass : userInfo.password,
      newpass ? newpass : "",
      age ? age : userInfo.age,
      gender ? gender : userInfo.gender
    );
    document.getElementById("profilepic").src = url;
  };

  const handleDelete = () => {
    const imageRef = ref(storage, auth.currentUser.uid + ".jpg");
    deleteObject(imageRef);
    setURL(null);
    setImage(null);
    db.collection("users").doc(auth.currentUser.email).set(
      {
        profilePicture: null,
      },
      { merge: true }
    );
    toggleModal();
    document.getElementById("profilepic").src = null;
  };

  const [first, setFirst] = React.useState("");
  const [f, setF] = React.useState("abcd");

  const [last, setLast] = React.useState("");
  const [l, setL] = React.useState("abcd");

  const [uname, setUname] = React.useState("");
  const [u, setU] = React.useState("abcd");

  const [email, setEmail] = React.useState("");
  const [e, setE] = React.useState("abcd");

  const [oldpass, setOldpass] = React.useState("");
  const [newpass, setNewpass] = React.useState("");

  const [deleteuser, setDeleteuser] = React.useState("");
  const [deletepass, setDeletepass] = React.useState("");

  const [age, setAge] = React.useState("");
  const [a, setA] = React.useState("abcd");

  const [gender, setGender] = React.useState("");
  const [g, setG] = React.useState("abcd");

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <Box>
      {/* My Profile Title */}
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Edit Profile</h1>
      </Stack>

      {/* Components Stack */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        //style={{ padding: "0px", marginLeft: "50px", marginRight: "50px" }}
      >
        {/* Profile Picture*/}
        <Stack spacing={2} alignItems="center" width="25%">
          <Avatar
            src={userInfo?.profilePicture || url}
            id="profilepic"
            sx={{ width: 150, height: 150 }}
          />

          <Button
            variant="contained"
            component="label"
            onChange={handleImageChange}
            sx={{
              "&:hover": { backgroundColor: "primary.main.dark" },
              color: "black",
              backgroundColor: "primary.main",
            }}
          >
            Edit Profile Picture
            <input hidden accept="image/*" type="file" />
          </Button>

          <Button
            variant="contained"
            disableElevation
            uppercase={false}
            className="btn-modal"
            onClick={toggleModal}
            sx={{
              boxShadow: 3,
              "&:hover": { backgroundColor: "primary.main.dark", boxShadow: 3 },
              color: "black",
              backgroundColor: "primary.main",
            }}
          >
            Delete Profile Picture
          </Button>

          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <h3> Are you sure you want to delete your profile picture?</h3>
                <p> This action cannot easily be undone. </p>
                <button className="close-modal" onClick={toggleModal}>
                  {" "}
                  X{" "}
                </button>
                <button className="delete-modal" onClick={handleDelete}>
                  {" "}
                  DELETE{" "}
                </button>
              </div>
            </div>
          )}
        </Stack>

        {/* Text Fields */}
        <Box width={"60%"}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
            width="70%"
          >
            <TextField
              label="First Name"
              defaultValue="First"
              value={f ? userInfo.firstName : first}
              onChange={(event) => {
                setF("");
                setFirst(event.target.value);
              }}
            />
            <TextField
              label="Last Name"
              defaultValue="Last"
              value={l ? userInfo.lastName : last}
              onChange={(event) => {
                setL("");
                setLast(event.target.value);
              }}
            />
            <TextField
              label="Username"
              defaultValue="username"
              value={u ? userInfo.username : uname}
              onChange={(event) => {
                setU("");
                setUname(event.target.value);
              }}
            />

            {/* Age field */}
            <TextField
              label="Age"
              defaultValue="36"
              value={a ? userInfo.age : age}
              onChange={(event) => {
                setA("");
                setAge(event.target.value);
              }}
            />

            {/* Gender field */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Gender"
                defaultValue={"Male"}
                style={{ textAlign: "left" }}
                onChange={(event) => {
                  setG("");
                  setGender(event.target.value);
                }}
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Others</MenuItem>
              </Select>
            </FormControl>

            {/* Submit + Delete Buttons */}

            <Stack
              direction="column"
              justifyContent="center"
              alignItems="stretch"
              spacing={2}
              width="80%"
            >
              <Box></Box>

              {/* Submit + Delete Buttons */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={8}
                justifyContent="space-between"
                width={"125%"}
              >
                <Button
                  variant="contained"
                  margin={0}
                  onClick={() => {
                    submit();
                  }}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleClickOpen}
                  margin={0}
                >
                  Delete Account
                </Button>
                <Dialog open={open} onClose={handleClose}>
                  <DialogTitle>Confirm Account Action</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete you wander account? This
                      action is permanent and cannot be reverse. If yes, please
                      reenter your email and password.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      onChange={(event) => {
                        setDeleteuser(event.target.value);
                      }}
                      label="Enter Email"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      onChange={(event) => {
                        setDeletepass(event.target.value);
                      }}
                      label="Enter Password"
                      fullWidth
                      type="password"
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={(event) => {
                        deleteUserFromBase(deleteuser, deletepass);
                      }}
                    >
                      Delete Account
                    </Button>
                  </DialogActions>
                </Dialog>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
