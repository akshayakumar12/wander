import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Box from "@mui/material/Box";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
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

  const [addDisable, setAddDisable] = useState(false);

  let numStops = 0;

  function checkNumStops() {
    if (numStops == 2) {
      setAddDisable(true);
    }
  }

  return (
    <>
      <Box marginLeft={4}>
        <Stack spacing={1} direction={"column"}>
          <Stack alignItems="left" spacing={1} direction={"column"}>
            <h1
              align="left"
              style={{ margin: 0, marginTop: "5%", marginBottom: "2%" }}
            >
              Create Trip
            </h1>

            <h3 align="left" style={{ marginBottom: 0, marginTop: 10 }}>
              Starting Location
            </h3>
            <Box width={"25%"}>
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
                            ? { backgroundColor: "#d5e4f4", cursor: "pointer" }
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

              <Button 
                variant = "text"
                startIcon = {<AddCircleOutlineIcon />}
                disabled = {addDisable}
                style = {{
                  color: "#003e80",
                  marginLeft: "0px",
                }}
              > 
                Add Stop 
              </Button>

              <h3 align="left">Destination</h3>
              <div>
                <PlacesAutocomplete
                  value={destination}
                  onChange={setDestination}
                  onSelect={handleSelectDestination}
                  sx={{ innerWidth: 100 }}
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
                            ? { backgroundColor: "#d5e4f4", cursor: "pointer" }
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
            </Box>

            <FormControl name="preference">
              <FormLabel>
                <br></br>
                <h3 align="left" style={{ margin: 0, color: "black" }}>
                  Travel Preference
                </h3>
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
            justifyContent="flex-start"
            alignItems=""
            m={0}
            p={0}
            direction={"row"}
          >
            <Button
              variant="contained"
              margin={0}
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
      </Box>
    </>
  );
}

export default NewTrip;
