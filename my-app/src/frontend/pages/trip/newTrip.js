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
import { useJsApiLoader, AutoComplete } from '@react-google-maps/api';


function NewTrip() {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  return (
    <>
      <Container sx={{ justifyContent: "left" }} disableGutters="true">
        <Stack alignItems="flex-start" spacing={4}>
          <h1 align="left">Create Trip</h1>
          
          <h3 align="left">Starting Location</h3>
          <Autocomplete>
            <TextField
              label = "Source"
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Autocomplete>
          
          <h3 align="left">Destination</h3>
          <Autocomplete>
            <TextField
              label="Destination"
              variant="outlined"
              style={{ width: "50%" }}
            />
          </Autocomplete>
          
          <FormControl>
            <FormLabel>Travel Preference</FormLabel>
            <RadioGroup>
              <FormControlLabel value="Car" control={<Radio />} label="Car" />
              <FormControlLabel
                value="plane"
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
            onClick={() => navigate("../quiz") }
          >
            Create Trip
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default NewTrip;
