import { createTheme, ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import "./style.css";

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

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
    padding: "3",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor:
      theme.palette.mode === "light" ? "primary.contrastText" : "#2b2b2b",
    border: "1px solid #c5c5c4",
    fontSize: 16,
    width: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "background-color"]),
    fontFamily: ["Rubik"].join(","),
    "&:focus": {
      /*
      boxShadow: `${alpha(
        theme.palette.primary.contrastText,
        0.25
      )} 0 0 0 0.2rem`,
      */
      borderColor: "#DE6600",
      borderWidth: 2,
    },
  },
}));

export default function BootstrapUsage() {
  return (
    <ThemeProvider theme={Theme}>
      <BootstrapInput />
    </ThemeProvider>
  );
}
