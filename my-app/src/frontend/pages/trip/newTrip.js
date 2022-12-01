import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "../../../backend/pages/trip/createNewTrip";
import createTrip from "../../../backend/pages/trip/createNewTrip";
import "./trip.css";

function NewTrip() {
  const navigate = useNavigate();

  function createNewTrip(source, destination, preference, midpoint1, midpoint2) {
    createTrip(source, destination, preference, midpoint1, midpoint2);
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

  const [midpointsList, setMidpointsList] = useState([{midpoint: ""}]);

  const handleMidpointAdd = () => {
    setMidpointsList([...midpointsList, {midpoint: ""}]);
  };

  const handleMidpointRemove = (index) => {
    const list = [...midpointsList];
    list.splice(index, 1);
    setMidpointsList(list);

    if (index === 0) {
      setMidpoint1(midpoint2);
      setMidpoint2("");
    } else {
      setMidpoint2("");
    }
  };

  const [midpoint1, setMidpoint1] = useState("");
  const [midpoint2, setMidpoint2] = useState("");

  const handleSelectMidpoint1 = async (value) => {
    setMidpoint1(value);
  };

  const handleSelectMidpoint2 = async (value) => {
    setMidpoint2(value);
  };

  console.log("Midpoint1: " + midpoint1 + "\nMidpoint2: " + midpoint2);

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
                      <div className = "autocomplete-dropdown-container">
                        {loading ? <div width = {"100%"}> Loading... </div> : null}
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

              <form align = "left">
              <div>
                <div>
                  {midpointsList.map((singleMidpoint, index) => (   
                    <div key = {index}>
                      {midpointsList.length > 0 && (
                      <Box>
                        <h3 align="left" style={{ marginBottom: 0, marginTop: 10 }}>
                          Midpoint
                        </h3>
                        
                        <PlacesAutocomplete
                          value = {index === 0? midpoint1 : midpoint2}
                          onChange={index === 0? setMidpoint1 : setMidpoint2}
                          onSelect={index === 0? handleSelectMidpoint1 : handleSelectMidpoint2}
                          >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div>
                              <input
                                {...getInputProps({ placeholder: "Enter Midpoint" })}
                                />
                              <div className = "autocomplete-dropdown-container">
                              {loading ? <div width = {"100%"}> Loading... </div> : null}
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

                        {midpointsList.length > 1 && (
                          <IconButton
                            onClick={() => handleMidpointRemove(index)}
                          >
                            <RemoveCircleOutlineIcon 
                              sx = {{color: "#e3242b", padding: 1}}
                              fontSize = "small"
                            />
                          </IconButton>
                        )}
                      </Box>
                      )}
                    

                      {midpointsList.length - 1 === index  && midpointsList.length < 2 && (
                        <div> 
                          <Button 
                            variant = "text"
                            startIcon = {<AddCircleOutlineIcon />}
                            style = {{
                              color: "#003e80",
                            }}
                            onClick = {() => handleMidpointAdd()}
                          > 
                              Add Stop 
                          </Button> 

                        </div>
                      )}
                    </div>
                  ))}   
                </div>
              </div>
            </form>

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
                      <div className = "autocomplete-dropdown-container">
                        {loading ? <div width = {"100%"}> Loading... </div> : null}
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
              onClick={() => createNewTrip(source, destination, preference, midpoint1, midpoint2)}
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
