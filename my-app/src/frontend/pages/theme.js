import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./style.css";
import Box from "@mui/material/Box";
import { auth, firestore, db } from "../../firebase";
import { useEffect, useState } from "react";
import App from "../../App";

export const getDesignTokens = (mode) => ({
  palette: {
    mode: mode ? "dark" : "light",
    ...(mode
      ? {
          // palette values for dark mode
          /*
          primary: {
            main: "#02407F",
            contrastText: "#F5ECE3",
          },
          */
        }
      : {
          // palette values for light mode
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
        }),
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
  },
});

/*
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
  },
});
*/
