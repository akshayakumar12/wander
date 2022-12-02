import { Card, CardActionArea, CardContent, Button, Box } from "@mui/material";
import { Stack } from "@mui/system";
//import PlaylistPage from "../playlist/playlistPage";
import Playlist from "../playlist/playlist";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { useLocation } from "react-router-dom";
import Loading from "../quiz/loading";
import "./homepage.css";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Home() {
  //window.location.reload(false);
  const navigate = useNavigate();
  let location = useLocation();

  const google = window.google;
  const center = { lat: 48.8584, lng: 2.2945 };
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [srcLatLong, setSrcLatLong] = useState([]);
  const [destLatLong, setDestLatLong] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/geocode/json?address=AIzaSyDI3xucnyuvVc5MuSmWeSMot43AOewC7Bg&sensor=true",
    libraries: ["places"],
    //"AIzaSyDI3xucnyuvVc5MuSmWeSMot43AOewC7Bg",
  });

  const [show, setShow] = useState(false);
  const [pastTrip, setPastTrip] = useState("");
  const [curTripExists, setCurTripExists] = useState(false);

  const getData = async () => {
    const response = db.collection("pastTrips");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (
        item.data().email == auth.currentUser.email &&
        item.data().latest == "true"
      ) {
        setPastTrip(item.data());
        setCurTripExists(true);
      }
    });
    setShow(true);
  };

  

  useEffect(() => {
    getData();
    calculateRoute();
  }, [location]);

  async function calculateRoute() {
    console.log(pastTrip?.source);
    if (pastTrip?.source === "" || pastTrip?.destination === "") {
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pastTrip?.source,
      destination: pastTrip?.destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator"
  return (
    <Stack alignItems={"flex-start"} marginX="15%">
      {show ? (
        <>
          <Card
            sx={{
              marginTop: "5%",
              width: "100%",
              height: "80%",
              bgcolor: "cardBg.main",
              borderRadius: "16px",
              boxShadow: 3,
              alignContent: "center",
            }}
            disableTouchRipple="true"
          >
            <>
              {curTripExists ? (
                <CardContent sx={{ marginX: "1%" }}>
                  {" "}
                  <h2
                    align="Left"
                    style={{ fontSize: "35px", marginTop: 0, marginBottom: 20 }}
                    onClick={() => {
                      navigate("../expandedTrip");
                    }}
                  >
                    Current Trip
                  </h2>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
                    <Stack direction={"column"} spacing={2}>
                      <Stack>
                        <Card
                          sx={{
                            boxShadow: "3",
                            borderRadius: "16px",
                          }}
                        >
                          <CardActionArea
                            onClick={() => {
                              navigate("/tripview");
                            }}
                          >
                            <CardContent>
                              <p
                                align="Left"
                                style={{
                                  fontSize: "17px",
                                  marginTop: 0,
                                  fontWeight: "bold",
                                }}
                              >
                                {pastTrip?.source}
                              </p>

                              


                              <Box sx={{ borderLeft: 1 }} paddingLeft={1}>
                                <p align="Left"> {pastTrip?.midpoint1} </p>
                                <p align="Left"> {pastTrip?.midpoint2} </p>
                              </Box>

                              <p
                                align="Left"
                                style={{
                                  fontSize: "17px",
                                  marginTop: 30,
                                  margin: 0,
                                  fontWeight: "bold",
                                }}
                              >
                                {" "}
                                {pastTrip?.destination}
                              </p>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Stack>
                      <br></br>
                      <Stack>
                        <Card
                          sx={{
                            maxHeight: 140,
                            maxWidth: "100%",
                            boxShadow: "3",
                            borderRadius: "16px",
                          }}
                        >
                          <CardActionArea
                            onClick={() =>
                              navigate("../playlist", {
                                state: {
                                  Playlist: pastTrip?.playlist,
                                },
                              })
                            }
                            sx={{ paddingBottom: "2%" }}
                          >
                            <p
                              style={{
                                fontSize: "17px",
                                fontWeight: "bold",
                              }}
                            >
                              Playlist for your current trip
                            </p>
                            <Playlist
                              //text={"Playlist for your current trip"}
                              src={pastTrip?.playlist}
                            ></Playlist>
                          </CardActionArea>
                        </Card>
                      </Stack>
                    </Stack>
                    <br></br>
                    <Stack>
                      {/* invisible button 💀 DO NOT REMOVE*/}
                       <Button 
                        onCLick={calculateRoute()}
                      >
                        </Button>
                      <Card
                        sx={{
                          width: { sm: 500, xs: 250 },
                          minHeight: 290,
                          boxShadow: "3",
                          borderRadius: "16px",
                          padding: 1,
                        }}
                      >
                        <h3
                          align="left"
                          style={{ marginLeft: "5%", fontSize: "20px" }}
                        >
                          Map
                        </h3>
                        {/* Google Maps*/}
                        <GoogleMap
                          //center={center}
                          zoom={15}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                          options={{ mapTypeControl: false }}
                          onLoad={(map) => setMap(map)}
                        >
                          <Marker position={center}></Marker>
                          <DirectionsRenderer
                            directions={directionsResponse}
                          ></DirectionsRenderer>
                        </GoogleMap>
                      </Card>
                    </Stack>
                  </Stack>
                </CardContent>
              ) : (
                /* NO CURRENT TRIPS */
                <>
                  <h1>You have no current trips</h1>
                </>
              )}
            </>
          </Card>

          <Button
            variant="contained"
            justifyContent="flex-start"
            id="greenButton"
            sx={{
              marginTop: "2%",
              //bgcolor: "#007A1B",
              textTransform: "none",
              fontSize: "20px",
            }}
            onClick={() => navigate("/newtrip")}
            size="large"
          >
            Create New Trip
          </Button>
        </>
      ) : (
        <Loading></Loading>
      )}
    </Stack>
  );
}
export default Home;

/*;*/
