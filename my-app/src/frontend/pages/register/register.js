import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

function register() {

    return (
        <Box>
            <Stack container direction="row" columnSpacing={5} justifyContent="center">

                {/* Left Stack */}
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} width="70%">
                    <h1>[placeholder]</h1>
                </Stack>

                {/* Right Components Stack */}
                <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} width="70%">
                    {/* My Profile Title */}
                    <Stack alignItems={"flex-start"}><h1>Register</h1></Stack>

                    {/* Components Stack */}
                    <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2} width="70%">

                        {/* First name field */}
                        <TextField
                            label="First Name"
                        />

                        {/* Last name field */}
                        <TextField
                            label="Last Name"
                        />

                        {/* Username field */}
                        <TextField
                            label="Username"
                        />

                        {/* Email field */}
                        <TextField
                            label="Email Address"
                        />

                        {/* Password field */}
                        <TextField
                            label="Password"
                            type="password"
                        />

                        {/* Questionaire 1: What is your favorite sport? */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">What is your favorite sport</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="sport"
                            >
                                <MenuItem value={10}>Tennis</MenuItem>
                                <MenuItem value={20}>Soccer</MenuItem>
                                <MenuItem value={30}>Football</MenuItem>
                                <MenuItem value={40}>Swimming</MenuItem>
                                <MenuItem value={50}>Dancing</MenuItem>
                                <MenuItem value={60}>Cheerleading</MenuItem>
                                <MenuItem value={60}>Baseball</MenuItem>
                                <MenuItem value={70}>Badminton</MenuItem>
                                <MenuItem value={80}>Basketball</MenuItem>
                                <MenuItem value={90}>Rugby</MenuItem>
                                <MenuItem value={100}>Figure Skating</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Questionaire 2: What is your favorite color? */}
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">What is your favorite color?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="color"
                            >
                                <MenuItem value={10}>Red</MenuItem>
                                <MenuItem value={20}>Green</MenuItem>
                                <MenuItem value={30}>Blue</MenuItem>
                                <MenuItem value={40}>Yellow</MenuItem>
                                <MenuItem value={50}>Purple</MenuItem>
                                <MenuItem value={60}>Black</MenuItem>
                                <MenuItem value={60}>White</MenuItem>
                                <MenuItem value={70}>Orange</MenuItem>
                                <MenuItem value={80}>Teal</MenuItem>
                                <MenuItem value={90}>Cyan</MenuItem>
                                <MenuItem value={100}>Fuchsia</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Get Started button */}
                        <Button variant="contained" disableElevation uppercase={false}>Get Started</Button>

                        {/* Log in option */}
                        <body>Already have an account?</body>
                        <Button>Log In</Button>


                    </Stack>
                </Stack>

            </Stack>
        </Box>
    )
}

export default register;