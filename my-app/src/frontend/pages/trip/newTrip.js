import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "../../../backend/pages/trip/createNewTrip";
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
  };
  const handleSelectDestination = async (value) => {
    setDestination(value);
  };

  return (
    <>
      <Container sx={{ width: { sm: "29%", xs: "80%" }, margin: 3 }}>
        <Stack spacing={1} direction={"column"}>
          <Stack alignItems="flex-start" spacing={1} direction={"column"}>
            <h1
              align="left"
              style={{ margin: 0, marginTop: "5%", marginBottom: "2%" }}
            >
              Create Trip
            </h1>

            <h3 align="left" style={{ marginBottom: 0, marginTop: 10 }}>
              Starting Location
            </h3>
            <div>
              <PlacesAutocomplete
                value={source}
                onChange={setSource}
                onSelect={handleSelectSource}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      {...getInputProps({ placeholder: "Enter Source" })}
                    />
                    <div>
                      {loading ? <div> Loading... </div> : null}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? { backgroundColor: "#74a8db", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
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
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div>
                    <input
                      class="autocomplete-field"
                      {...getInputProps({ placeholder: "Enter Destination" })}
                    />
                    <div>
                      {loading ? <div> Loading... </div> : null}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        const style = suggestion.active
                          ? { backgroundColor: "#74a8db", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };

                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                          >
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
              <FormLabel>
                <h3 style={{ margin: 0, color: "black" }}>Travel Preference</h3>
              </FormLabel>
              <RadioGroup
                onChange={(event) => setPreference(event.target.value)}
              >
                <FormControlLabel value="Car" control={<Radio />} label="Car" />
                <FormControlLabel
                  value="Plane"
                  control={<Radio />}
                  label="Plane"
                />
              </RadioGroup>
            </FormControl>
          </Stack>

          <Stack
            justifyContent="flex-end"
            alignItems="center"
            width={{ xs: "115%", sm: "105%" }}
            m={0}
            p={0}
            direction={"row"}
          >
            <Button
              variant="contained"
              style={{
                backgroundColor: "#DE6600",
                textTransform: "none",

                marginTop: "1%",
              }}
              onClick={() => createNewTrip(source, destination, preference)}
            >
              Create Trip
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

export default NewTrip;
