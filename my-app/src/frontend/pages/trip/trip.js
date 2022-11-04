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
import PlacesAutocomplete from 'react-places-autocomplete';

import editTrip from "../../../backend/pages/trip/editTrip";

function TripView() {
  const navigate = useNavigate();

  const [newSource, setNewSource] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newPreference, setNewPreference] = useState("");

  const handleSelectNewSource = async (value) => {
    setNewSource(value);
  }
  const handleSelectNewDestination = async (value) => {
    setNewDestination(value);
  }

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
          <div>
            <PlacesAutocomplete
              value={newSource}
              onChange={setNewSource}
              onSelect={handleSelectNewSource}
            >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: "Enter New Source" })} />
                <div>
                  {loading ? <div> Loading... </div> : null}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#74a8db', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            </PlacesAutocomplete>
          </div>


          <h3 align="left">Destination</h3>
          <div>
            <PlacesAutocomplete
              value={newDestination}
              onChange={setNewDestination}
              onSelect={handleSelectNewDestination}
            >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input class="autocomplete-field" {...getInputProps({ placeholder: "Enter Destination" })} />
                <div>
                  {loading ? <div> Loading... </div> : null}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    const style = suggestion.active
                      ? { backgroundColor: '#74a8db', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            </PlacesAutocomplete>
          </div>

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
