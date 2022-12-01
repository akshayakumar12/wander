import {
  Card,
  CardActionArea,
  CardContent,
  Button,
  Divider,
} from "@mui/material";
import { Stack } from "@mui/system";
import Playlist from "../playlist/playlist";
import { useNavigate } from "react-router-dom";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import Loading from "../quiz/loading";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import Geocode from "react-geocode";

export default function ExpandedTrip() {
  const navigate = useNavigate();
  const google = window.google
  const [pastTrip, setPastTrip] = useState("");
  const center = { lat: 48.8584, lng: 2.2945 }
  const [map, setMap] = useState(/** @type google.maps.Map*/ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [srcLatLong, setSrcLatLong] = useState([])
  const [destLatLong, setDestLatLong] = useState([])
  


  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDI3xucnyuvVc5MuSmWeSMot43AOewC7Bg",
  })

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

  if (!isLoaded) {
    return (<Loading></Loading>);
  }

  const editTrip_click = () => {
    navigate("/tripview");
  };


  async function calculateRoute() {
    console.log(pastTrip?.source)
    if (pastTrip?.source === '' || pastTrip?.destination === '') {
      return
    }

    /*var geocoder = new google.maps.Geocoder();
    var result = "";
    geocoder.geocode( {'address': pastTrip?.source}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          srcLatLong[0] = results[0].geometry.location.Pa;
          srcLatLong[1] = results[0].geometry.location.Qa;
      } else {
          result = "Unable to find address: " + status;
      }
     });

     console.log(srcLatLong)*/

     // Get latitude & longitude from address.
    /*Geocode.fromAddress("Eiffel Tower").then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );*/

    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: new google.maps.LatLng(46.56300788, 15.62779705),
      destination: new google.maps.LatLng(46.55953332, 15.62616729),
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  /*function getLatLong(address) {
    var geocoder = new google.maps.Geocoder();
    var result = "";
    geocoder.geocode( {'address': address}, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
             result[lat] = results[0].geometry.location.Pa;
             result[lng] = results[0].geometry.location.Qa;
         } else {
             result = "Unable to find address: " + status;
         }
         storeResult(result);
        });
    }*/

  return (
    <>
      <Box
        position="absolute"
        zIndex={0}
        width="100%"
        height="1000px"
        //color="gray"
        //sx={{ backgroundColor: "gray" }}
      >

      {/* Google Maps API */}
      <GoogleMap 
        //center={center}
        zoom={15}
        mapContainerStyle={{width: '100%', height: '100%'}}
        options={{mapTypeControl: false}}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center}></Marker>
        <DirectionsRenderer directions={directionsResponse}></DirectionsRenderer>

      </GoogleMap>

      </Box>

      {/* front stack */}
      <Stack position="absolute" paddingLeft="5%" width="60%" zIndex={1}>
        <Button
          variant="contained" 
          onClick={calculateRoute}
        >
          show trip
        </Button>
        <Card
          sx={{
            marginTop: "5%",
            width: "60%",
            height: "80%",
            bgcolor: "#F5F7FA",
            borderRadius: "16px",
            boxShadow: 3,
            alignContent: "center",
          }}
          disableTouchRipple="true"
        >
          <CardActionArea>
            <CardContent sx={{ marginX: "1%" }}>
              <Stack direction="row" width="100%">
                <Stack width="80%">
                  <p
                    align="Left"
                    style={{
                      fontSize: "20px",
                      marginBottom: 20,
                      fontWeight: "bold",
                      // fontWeight: "bold",
                    }}
                  >
                    Source: {pastTrip?.source}
                  </p>
                  <Box
                    zIndex={0}
                    sx={{ borderLeft: 1 }}
                    //position="absolute"
                  >
                    <Box margin={0}>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: 20,
                          //padding: 0,
                          listStyle: "circle",
                          //fontSize: "3.5em",
                        }}
                      >
                        <li
                          style={{
                            fontSize: "2.5em",
                            width: "100",
                            textAlign: "center",
                            marginBottom: 10,
                          }}
                        >
                          <div
                            align="left"
                            style={{ fontSize: 25, align: "left" }}
                          >
                            Midpoint 1:
                          </div>
                        </li>
                        <li
                          style={{
                            fontSize: "2.5em",
                            marginBottom: 10,
                          }}
                        >
                          <div
                            align="left"
                            style={{ fontSize: 25, align: "left" }}
                          >
                            Midpoint 2:
                          </div>
                        </li>
                      </ul>
                    </Box>
                  </Box>

                  <p
                    align="Left"
                    style={{
                      fontSize: "20px",
                      marginTop: 20,
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Destination: {pastTrip?.destination}
                  </p>
                </Stack>
                <Stack width="10%">
                  <Button variant="contained" onClick={editTrip_click}>
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{
            marginTop: "5%",
            width: "60%",
            height: "80%",
            bgcolor: "#F5F7FA",
            borderRadius: "16px",
            boxShadow: 3,
            alignContent: "center",
          }}
          disableTouchRipple="true"
        >
          <CardActionArea
            onClick={() => navigate("../playlist")}
            sx={{ paddingBottom: "2%" }}
          >
            <Playlist src={pastTrip?.playlist}></Playlist>
          </CardActionArea>
        </Card>
      </Stack>

    </>
  );
}
