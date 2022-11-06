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
        console.log();
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  function editTheTrip(source, destination, preference) {
    editTrip(
      pastTrip.source,
      pastTrip.destination,
      source,
      destination,
      preference
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
                        {...getInputProps({ placeholder: "Enter New Source" })}
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
            </Box>

            <FormControl>
              <FormLabel>
                <h3 style={{ margin: 0, color: "black" }}>Travel Preference</h3>
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
                editTheTrip(newSource, newDestination, newPreference);
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
