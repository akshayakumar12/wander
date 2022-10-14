import Header from "../header/header";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function NewPassword() {
  const navigate = useNavigate();

  const login_click= () => {
    navigate("/");
  };

  const register_click = () => {
    navigate("/register");
  };

  return (
    <Box>
      {/* Header */}

      <Stack alignItems="center" marginTop="10%">
        {/* My Profile Title */}
        <Stack
          alignItems="stretch"
          justifyContent="space-between"
          spacing={2}
          style={{
            backgroundColor: "",
            maxWidth: "416px",
            width: "100%",
            padding: "5%",
          }}
        >
          <h1 style={{ textAlign: "left" }}>Reset Password</h1>
          <p style={{ textAlign: "left" }}>
            {" "}
            Enter your new password. 
          </p>
          <TextField label="New Password" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              disableElevation
              uppercase={false}
              onClick={login_click}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default NewPassword;