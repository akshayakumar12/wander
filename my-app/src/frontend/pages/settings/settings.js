import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Button } from "@mui/material";

export default function Settings() {

    return (
        <Box>
            {/* My Profile Title */}
            <Stack
                alignItems={"flex-start"}
                style={{ marginLeft: "50px", marginRight: "50px" }}
            >
                <h1>Settings</h1>
            </Stack>

            <Stack direction="column" spacing={3}>
                <Stack direction="column" alignItems="flex-start" justifyContent="center" style={{marginLeft: "50px", marginRight: "50px"}}>
                    <p> Appearance</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <Select
                            labelId="demo-select-small"
                            id="demo-select-small"
                        >
                            <MenuItem value={10}>Light</MenuItem>
                            <MenuItem value={20}>Dark</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>


                <Stack direction="column" alignItems="flex-start" justifyContent="center" style={{marginLeft: "50px", marginRight: "50px"}}>
                    <Button variant="contained">Save</Button>
                </Stack>

            </Stack>

        </Box>

    )

}
