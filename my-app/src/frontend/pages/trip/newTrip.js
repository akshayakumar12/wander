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
import { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import "../../../backend/pages/trip/createNewTrip";
import createTrip from "../../../backend/pages/trip/createNewTrip";
import "./trip.css";
import { auth, db } from "../../../firebase";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

function NewTrip() {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [preference, setPreference] = useState("");
  const [suggestBgColor, setSuggestBgColor] = useState("");
  const [suggestBgColorPoint, setSuggestBgColorPoint] = useState("");


  // GOOGLE MAPS DURATION OF TRIP STUFF
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/geocode/json?address=AIzaSyDI3xucnyuvVc5MuSmWeSMot43AOewC7Bg&sensor=true",
    libraries: ["places"],
    //"AIzaSyDI3xucnyuvVc5MuSmWeSMot43AOewC7Bg",
  });

  const google = window.google;
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("test");

  async function calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
    origin: source,
    destination: destination,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);

    console.log(source + " to " + destination + ": " + results.routes[0].legs[0].duration.text);

    db.collection("users")
      .where("email", "==", auth.currentUser.email)
      .get()
      .then((qSnap) => {
        if (qSnap.empty) {
          // latest
        } else {
          // previous trips exist
          qSnap.docs.forEach((d) => {
            db.collection("users").doc(d.id).update({ duration: results.routes[0].legs[0].duration.text});
          });
        }
      });
  }

  const navigate = useNavigate();

  function createNewTrip(source, destination, preference, midpoint1, midpoint2) {
    createTrip(source, destination, preference, midpoint1, midpoint2);
    navigate("../quiz");
  }



  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    const value = localStorage.getItem("theme");
    console.log("bgcolor: " + value);
    value == "true" ? setSuggestBgColor("#272727") : setSuggestBgColor("white");
    value == "true"
      ? setSuggestBgColorPoint("#5e5e5e")
      : setSuggestBgColorPoint("#F5ECE3");
  });

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
                            ? {
                                backgroundColor: suggestBgColorPoint,
                                cursor: "pointer",
                              }
                            : {
                                backgroundColor: suggestBgColor,
                                cursor: "pointer",
                              };
                          //? { backgroundColor: "#74a8db", cursor: "pointer" }
                          //: { backgroundColor: "#ffffff", cursor: "pointer" };

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
                <h3 align="left" style={{ margin: 0 }}>
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
              onClick={() => {calculateRoute(); createNewTrip(source, destination, preference, midpoint1, midpoint2, duration);}}
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
