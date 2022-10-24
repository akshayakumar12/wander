import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function PastQuizPref() {
  return (
    <Box>
      {/* My Profile Title */}
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Past Quiz Preferences</h1>
      </Stack>

      {/* Components Stack */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: "0px", marginLeft: "50px", marginRight: "50px" }}
      ></Stack>
    </Box>
  );
}
