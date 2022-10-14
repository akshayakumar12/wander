import Header from "../header/header"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function securityQuestionnaire() {
    return (
        <>
            <Header/>
            <Stack alignItems="center" marginTop="10%">
                {/* My Profile Title */}
                <Stack alignItems="stretch" justifyContent="space-between" spacing={2} style={{ backgroundColor: "", maxWidth: "416px", width: "100%", padding: "5%"}}>
                    {/* Title */}
                    <h1 style={{ textAlign: "left"}}>Security Questions</h1>

                    {/* Question 1 */}
                    <p style={{ textAlign: "left"}}>[Question 1]</p>
                    <TextField/>

                    {/* Question 2 */}
                    <p style={{ textAlign: "left"}}>[Question 2]</p>
                    <TextField/>

                    {/* Submit Button */}
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Button variant="contained" disableElevation uppercase={false}>Submit</Button>
                    </Stack>

                </Stack>

            </Stack>
        </>

    )
}