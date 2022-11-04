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
import PlacesAutocomplete from 'react-places-autocomplete';
import '../../../backend/pages/trip/createNewTrip';
import createTrip from "../../../backend/pages/trip/createNewTrip";
import "./trip.css";


function NewTrip() {
  const navigate = useNavigate();

  function createNewTrip(source, destination, preference) {
    createTrip(source, destination, preference);
    navigate("../quiz");
  }

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("");

  const handleSelectSource = async (value) => {
    setSource(value);
  }
  const handleSelectDestination = async (value) => {
    setDestination(value);
  }

  return (
    <>
      <Container sx={{ justifyContent: "left" }} disableGutters="true">
        <Stack alignItems="flex-start" spacing={4}>
          <h1 align="left">Create Trip</h1>

          <h3 align="left">Starting Location</h3>
          <div>
            <PlacesAutocomplete
              value={source}
              onChange={setSource}
              onSelect={handleSelectSource}
            >{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: "Enter Source" })} />
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
              value={destination}
              onChange={setDestination}
              onSelect={handleSelectDestination}
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
            onClick={() => createNewTrip(source, destination, preference)}
          >
            Create Trip
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default NewTrip;
