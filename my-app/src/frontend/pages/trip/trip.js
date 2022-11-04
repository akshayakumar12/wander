import { Button, Stack, TextField } from "@mui/material";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { auth, db } from "../../../firebase";

import editTrip from "../../../backend/pages/trip/editTrip";

function TripView() {
  const navigate = useNavigate();

  const [newSource, setNewSource] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newPreference, setNewPreference] = useState("");

  const [pastTrip, setPastTrip] = useState("");
  const getData = async () => {
    const response = db.collection("pastTrips");
    const data = await response.get();
    data.docs.forEach((item) => {
      if ((item.data().email == auth.currentUser.email) && (item.data().latest == "true")) {
        setPastTrip(item.data());
        console.log()
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function editTheTrip(source, destination, preference) {
    editTrip(pastTrip.source, pastTrip.destination, source, destination, preference);
  }

  return (
    <>
      <Container
        sx={{ justifyContent: "left" }}
        disableGutters="true"
        padding="1%"
      >
        <Stack alignItems="flex-start" spacing={4}>
          <h1 align="left">Edit Trip Details</h1>
          <h3 align="left">Starting Location</h3>
          <TextField
            label="Starting Location"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(event) => setNewSource(event.target.value)}
          ></TextField>
          <h3 align="left">Destination</h3>
          <TextField
            label="Destination"
            variant="outlined"
            style={{ width: "50%" }}
            onChange={(event) => setNewDestination(event.target.value)}
          ></TextField>
          <FormControl>
            <FormLabel>Travel Preference</FormLabel>
            <RadioGroup 
              onChange={(event) => setNewPreference(event.target.value)}
            >
              <FormControlLabel value="Car" control={<Radio />} label="Car" />
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
            onClick={() => editTheTrip(newSource, newDestination, newPreference)}
          >
            Edit Changes
          </Button>
        </Stack>
      </Container>
    </>
  );
}
export default TripView;
