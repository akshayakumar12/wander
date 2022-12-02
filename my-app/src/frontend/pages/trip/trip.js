import { Button, Stack, TextField } from "@mui/material";

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Container } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "../../../firebase";
import PlacesAutocomplete from "react-places-autocomplete";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import editTrip from "../../../backend/pages/trip/editTrip";
import Box from "@mui/material/Box";

function TripView() {
  const navigate = useNavigate();

  const [newSource, setNewSource] = useState("");
  const [newDestination, setNewDestination] = useState("");
  const [newPreference, setNewPreference] = useState("");

  const handleSelectNewSource = async (value) => {
    setNewSource(value);
  };
  const handleSelectNewDestination = async (value) => {
    setNewDestination(value);
  };

  const [pastTrip, setPastTrip] = useState("");
  const getData = async () => {
    const response = db.collection("pastTrips");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (
        item.data().email == auth.currentUser.email &&
        item.data().latest == "true"
      ) {
        setPastTrip(item.data());
      }
    });
  };

  const [midpoint1, setMidpoint1] = useState("");
  const [midpoint2, setMidpoint2] = useState("");

  const handleSelectMidpoint1 = async (value) => {
    setMidpoint1(value);
  };

  const handleSelectMidpoint2 = async (value) => {
    setMidpoint2(value);
  };

  const [midpointsList, setMidpointsList] = useState([{midpoint: ""}, {midpoint: ""}]);

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

  useEffect(() => {
    getData();
  }, []);

  const [suggestBgColor, setSuggestBgColor] = useState("");
  const [suggestBgColorPoint, setSuggestBgColorPoint] = useState("");

  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const value = localStorage.getItem("theme");
    console.log("bgcolor: " + value);
    value == "true" ? setSuggestBgColor("#272727") : setSuggestBgColor("white");
    value == "true"
      ? setSuggestBgColorPoint("#5e5e5e")
      : setSuggestBgColorPoint("#F5ECE3");
  });

  function editTheTrip(source, destination, preference) {
    editTrip(
      pastTrip.source,
      pastTrip.destination,
      source,
      destination,
      preference,
      midpoint1,
      midpoint2
    );
    delay(1000).then(() => navigate("/home"));
  }

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  return (
    <>
      <Box
        marginLeft={4}
        //style={{ background: "#F5ECE3" }}
      >
        <Stack>
          <Stack alignItems="flex-start" spacing={1}>
            <h1
              align="left"
              style={{ margin: 0, marginTop: "5%", marginBottom: "2%" }}
            >
              Edit Trip Details
            </h1>
            <h3 align="left" style={{ marginBottom: 0, marginTop: 10 }}>
              Starting Location
            </h3>
            <Box width="25%">
              <div>
                <PlacesAutocomplete
                  value={newSource}
                  onChange={setNewSource}
                  onSelect={handleSelectNewSource}
                  style={{ margin: 0 }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        {...getInputProps({ placeholder: pastTrip.source })}
                      />
                      <div>
                        {loading ? <div> Loading... </div> : null}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: suggestBgColorPoint,
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: suggestBgColor,
                                cursor: "pointer",
                              };

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
                                {...getInputProps({ placeholder: (index === 0) ? pastTrip.midpoint1 : pastTrip.midpoint2})}
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
                              fontSize = "large"
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
                  value={newDestination}
                  onChange={setNewDestination}
                  onSelect={handleSelectNewDestination}
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
                        {...getInputProps({ placeholder: pastTrip.destination })}
                      />
                      <div>
                        {loading ? <div> Loading... </div> : null}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? {
                                backgroundColor: suggestBgColorPoint,
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: suggestBgColor,
                                cursor: "pointer",
                              };
                          /*
                            ? { backgroundColor: "#74a8db", cursor: "pointer" }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          */

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

            <FormControl>
              <FormLabel>
                <h3 style={{ margin: 0 }}>Travel Preference</h3>
              </FormLabel>
              <RadioGroup
                onChange={(event) => setNewPreference(event.target.value)}
              >
                <FormControlLabel
                  value="Car"
                  control={<Radio />}
                  label="Car"
                  style={{ margin: 0 }}
                />
                <FormControlLabel
                  value="Plane"
                  control={<Radio />}
                  label="Plane"
                  style={{ margin: 0 }}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Stack justifyContent="flex-start" m={0} p={0} direction={"row"}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#DE6600",
                textTransform: "none",
                marginTop: 5,
              }}
              onClick={() => {
                editTheTrip(newSource, newDestination, newPreference, midpoint1, midpoint2);
              }}
            >
              Edit Changes
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}

export default TripView;
