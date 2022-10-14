import Header from "../header/header";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function SecurityQuestionnaire() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
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
          {/* Title */}
          <h1 style={{ textAlign: "left" }}>Security Questions</h1>

          {/* Question 1 */}
          <p style={{ textAlign: "left" }}>What is your favorite sport?</p>
          <TextField />

          {/* Question 2 */}
          <p style={{ textAlign: "left" }}>What is your favorite color?</p>
          <TextField />

          {/* Submit Button */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              disableElevation
              uppercase={false}
              onClick={() => navigate("../change")} //add authentication
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default SecurityQuestionnaire;