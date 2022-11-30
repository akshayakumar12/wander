import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./style.css";
import Box from "@mui/material/Box";
import { auth, firestore, db } from "../../firebase";

export const Theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F5ECE3",
      contrastText: "#02407F",
    },
    secondary: {
      main: "#DE6600",
    },
    success: {
      main: "#439446",
    },
    black: {
      main: "#3d3d3d",
    },
  },
  typography: {
    fontFamily: "Rubik",
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#666666",
          },
        },
      },
    },
    /*
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            "& notchedOutline": {
              borderColor: "green",
            },
          },

          //"& > fieldset": { borderColor: "red" },

        },
        notchedOutline: {
          //borderColor: "red",
          "&.Mui-focused": {
            color: "green",
          },
        },
      },
    },
    */
  },
});

/*
export default async function TestPrint() {
  try {
    const userDocRef = db.collection("Settings").doc("hello@gmail.com");
    const doc = await userDocRef.get();
    if (!doc.exists) {
      console.log("No such document exista!");
    } else {
      console.log("Document data:", doc.data());
    }
  } catch (error) {
    alert(error.code);

  console.log("test");
  return (
    <Box>
      <h1>test print</h1>
    </Box>
  );
}

  }*/
