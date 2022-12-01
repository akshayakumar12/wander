import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./style.css";
import Box from "@mui/material/Box";
import { auth, firestore, db } from "../../firebase";
import { useEffect, useState } from "react";

/*
const initialState = !!JSON.parse(localStorage.getItem('theme'))

function MyThemeProvider(props) {
  const [mode, setMode] = useState(initialState);

  // you pass another function where you persist the value to localStorage
  // given your code you may just create a toggle function where you don't need to pass a value. but you can change it to receive an argument
  const toggleMode = () => {
    setMode(themeMode => {
      localStorage.setItem('theme', !themeMode)
      return !themeMode
    })
  }
  */
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

export default function TestPrint() {
  //console.log("test");
  const [option, setOption] = useState("");
  const getOp = async () => {
    const set = await db
      .collection("Settings")
      .doc(auth.currentUser.email)
      .get()
      .then((thing) => {
        setOption(thing.data());
        console.log(thing.data().appearance);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getOp();
  }, []);

  //return <h1>test print</h1>;
}
