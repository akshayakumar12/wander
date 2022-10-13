import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function changePass() {
  return (
    <Box>
      <Stack alignItems="center">
        <Stack alignItems="stretch" justifyContent="space-between" spacing={2}>
          <h1 style={{ textAlign: "left" }}>Change Password</h1>
          <p style={{ textAlign: "left" }}> Enter previous password</p>
          <TextField label="Previous Password" />
          <p style={{ textAlign: "left" }}> Enter new password</p>
          <TextField label="Current Password" />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button variant="contained" disableElevation uppercase={false}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
