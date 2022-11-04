import {
  Autocomplete,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../../../backend/pages/trip/trip';
import createTrip from "../../../backend/pages/trip/trip";


function NewTrip() {
  const navigate = useNavigate();

  function createNewTrip(source, destination, preference) {    
    createTrip(source, destination, preference);
    // navigate("../quiz");
  }

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState(""); 

  return (
    <>
      <Container sx={{ justifyContent: "left" }} disableGutters="true">
        <Stack alignItems="flex-start" spacing={4}>
          <h1 align="left">Create Trip</h1>

          <h3 align="left">Starting Location</h3>
          <TextField
            label="Source"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(event) => setSource(event.target.value)}
          />

          <h3 align="left">Destination</h3>
          <TextField
            label="Destination"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(event) => setDestination(event.target.value)}
          />

          <FormControl name="preference">
            <FormLabel>Travel Preference</FormLabel>
            <RadioGroup     
              onChange={(event) => setPreference(event.target.value)}
            >
              <FormControlLabel 
                value="Car" 
                control={<Radio />} 
                label="Car" 
              />
              <FormControlLabel
                value="Plane"
                control={<Radio />}
                label="Plane"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            display="flex"
            justify="space-between"
            justifyContent="flex-end"
            alignItems="flex-end"
            style={{
              backgroundColor: "#DE6600",
              textTransform: "none",
              width: "12%",
              marginTop: "1%",
            }}
            onClick={() => createNewTrip(source, destination, preference) } 
          >
            Create Trip
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default NewTrip;
