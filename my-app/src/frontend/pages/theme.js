import { createTheme } from "@mui/material/styles";

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
      main: "#4caf50",
    },
  },
});
