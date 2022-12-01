import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { useEffect, useState } from "react";

import { ColorModeContext } from "./color-context";
import { getDesignTokens } from "./frontend/pages/theme";

const MyThemeContext = React.createContext({});

const initialState = !!JSON.parse(localStorage.getItem("theme"));

export default function MyThemeProvider(props) {
  const [mode, setMode] = useState(initialState);
  console.log("testtesttest");
  console.log("initial state  " + initialState);

  // you pass another function where you persist the value to localStorage
  // given your code you may just create a toggle function where you don't need to pass a value. but you can change it to receive an argument
  const toggleMode = () => {
    setMode((themeMode) => {
      localStorage.setItem("theme", !themeMode);
      return !themeMode;
    });
  };
  /*
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          //mode,
          mode: mode ? "dark" : "light",
        },
      }),
    [mode]
  );
  */
  /*
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  */

  let theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={toggleMode}>
      <ThemeProvider theme={theme}>
        <MyThemeContext.Provider value={{ mode, toggleMode }}>
          {props.children}
        </MyThemeContext.Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //  <React.StrictMode>
  <BrowserRouter>
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </BrowserRouter>
  //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
