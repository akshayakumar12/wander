import { Card, CardActionArea, CardContent } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import * as React from "react";
import Loading from "../quiz/loading";
import { auth, db } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import Playlist from "../playlist/playlist";


const sendToPastTrips2 = async (embedLink) => {
  const response = db.collection('users');
  const data = await response.get();
  const temp = []
  data.docs.forEach((item) =>{
      if (item.data().email == auth.currentUser.email) {
          item.ref.update({
              playlist: embedLink
          });
      }
  })
  await new Promise(r => setTimeout(r, 1000));
  //window.location.reload();
};


export default function PastTrips() {
  const navigate = useNavigate();
  const [userPastTrips, setUserPastTrips] = useState([]);
  const [userPastTrips3Months, setUserPastTrips3Months] = useState([]);
  const [userPastTrips6Months, setUserPastTrips6Months] = useState([]);
  const [userPastTripsAll, setUserPastTripsAll] = useState([]);
  const [noPast, setNoPast] = useState(false);
  const [show, setShow] = useState(false);
  
  
  const getUserPastTripData = async () => {
    try {
      const response = db.collection("pastTrips");
      const data = await response.get();
      const temp = [];
      const temp3months = [];
      const temp6months = [];
      data.docs.forEach((item) => {
        if (item.data().email === auth.currentUser.email && item.data().latest === "false") {
          temp.push(item.data());
          if (item.data().timestamp.toDate() > new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)) { 
            temp3months.push(item.data())
          }
          if (item.data().timestamp.toDate() > new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000)) {
            temp6months.push(item.data())
          }
        }
      });

      // sort temp by time
      temp.sort((a, b) => b.timestamp - a.timestamp);
      temp3months.sort((a, b) => b.timestamp - a.timestamp);
      temp6months.sort((a, b) => b.timestamp - a.timestamp);
      console.log(temp);

      if (temp.length === 0) {
        setNoPast(true);
      }

      setUserPastTrips(temp);
      setUserPastTripsAll(temp);
      setUserPastTrips3Months(temp3months)
      setUserPastTrips6Months(temp6months)
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      getUserPastTripData();
    });
  }, []);

  const deleteAllTripData = async () => {
    try {
      const response = db.collection("pastTrips");
      const data = await response.get();
      const temp = [];
      data.docs.forEach((item) => {
        if (item.data().email === auth.currentUser.email) {
          item.ref.delete();
        }
      });

      setNoPast(true);
      setUserPastTrips(temp);
      setUserPastTripsAll(temp);
      setUserPastTrips3Months(temp);
      setUserPastTrips6Months(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const [filter, setFilter] = React.useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(filter + " <-filter")
  };
  const handleSubmit = (event) => {
    
    console.log(filter + " onclick")

    if (filter == 3) { // 3 months
      setUserPastTrips(userPastTrips3Months)
    }
    else if (filter == 6) { // 6 months
      setUserPastTrips(userPastTrips6Months)
    }
    else if (filter == 12) {
      setUserPastTrips(userPastTripsAll)
    }
    else {
      console.log("INVALID FILTER VALUE")
    }

  };

  const restoreTrip = async (cur_time, cur_email) => {
    console.log("Restore Trip");
    console.log(cur_time + "+" + cur_email);
    
    // set past current trip to false
    db.collection("pastTrips").where("email", "==", cur_email).get().then((qSnap) => {
      if (qSnap.empty) {
          // latest
      } else {
          // previous trips exist
          qSnap.docs.forEach((d) => {
              db.collection("pastTrips").doc(d.id).update({latest: "false"})
          }) 
      }
    })

    // set current trip to true
    db.collection("pastTrips").where("timestamp", "==", cur_time).get().then((qSnap) => {
      console.log("found trip to restore");
      if (qSnap.empty) {
        // latest
    } else {
        // previous trips exist
        qSnap.docs.forEach((d) => {
            db.collection("pastTrips").doc(d.id).update({latest: "true"}).then(() => {
                sendToPastTrips2(d.data().playlist);
                navigate("../home")
              }
            )
        }) 
    }
    })

    //navigate("../home");

  };

  return show ? (
    <>
      <Stack marginX="20%" marginTop="2%" spacing={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <h1 align="left">Past Trips</h1>
          <Box sx={{ width: 120 }}>
            <FormControl fullWidth>

              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={handleChange}
              >
                <MenuItem value={3}>3 Months</MenuItem>
                <MenuItem value={6}>6 Months</MenuItem>
                <MenuItem value={12}>All Time</MenuItem>
              </Select>
            </FormControl>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              >
              submit
            </Button>
          </Box>
        </Stack>

        {noPast ? (
          <>
            <Stack
              justifyContent="center"
              direction={"column"}
              spacing={4}
              alignItems="center"
              marginTop={4}
            >
              <h2>You have no past trips</h2>
              <Button
                disabled
                sx={{
                  //bottom: 0,
                  right: "4%",
                  position: "absolute",
                  bottom: "1%",
                }}
                variant="contained"
              >
                Delete History
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {userPastTrips.map((currentTrip) => (
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  bgcolor: "#F5F7FA",
                  borderRadius: "16px",
                  boxShadow: 3,
                  alignContent: "center",
                }}
                disableTouchRipple="true"
              >
                <CardActionArea>
                  <CardContent>
                    {/* Inner Card Stack */}
                    <Stack
                      m={2}
                      direction={"row"}
                      justifyContent="space-between"
                      spacing={4}
                    >
                      {/* Locations Card */}
                      <Card
                        sx={{
                          boxShadow: "3",
                          borderRadius: "16px",
                          width: "60%",
                          height: "100%",
                        }}
                      >
                        <CardActionArea
                          width="100%"
                          height="100%"
                          onClick={() => navigate("../tripview")}
                        >
                          <CardContent width="100%" height="1000px">
                            <Stack
                              margin="0"
                              direction="row"
                              width="100%"
                              height="100%"
                              justifyContent="space-evenly"
                            >
                              <p
                                //align="Left"
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                }}
                              >
                                {currentTrip.source}
                              </p>

                              <ArrowForwardIcon
                                style={{
                                  align: "center",
                                  fontSize: "17px",
                                  marginTop: 20,
                                  marginBottom: 20,
                                  fontWeight: "bold",
                                }}
                              />

                              <p
                                //align="Left"
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                }}
                              >
                                {currentTrip.destination}
                              </p>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                      </Card>

                      {/* Playlist Card */}
                      <Card
                        sx={{
                          boxShadow: "3",
                          borderRadius: "16px",
                          width: "40%",
                          height: "100%",
                          maxHeight: 225,
                        }}
                      >
                        <CardActionArea
                          width="100%"
                          height="100%"
                          onClick={
                            () => navigate("../playlist", {
                            state: {
                                Playlist: currentTrip.playlist,
                                Past: true
                              }
                            })
                          }
                          sx={{ paddingBottom: "2%" }}
                        >
                          <CardContent width="100%" height="1000px">
                            <Stack
                              direction="column"
                              width="100%"
                              height="100%"
                              justifyContent="center"
                            >
                              <p
                                align="center"
                                style={{
                                  fontSize: "17px",
                                  fontWeight: "bold",
                                  margin: "0",
                                  marginTop: "3%",
                                  marginBottom: "3%",
                                }}
                              >
                                <LibraryMusicIcon sx={{}} /> Playlist
                              </p>
                              <Stack sx={{ height: "500px" }}>
                                <Playlist src={currentTrip.playlist} past={true}></Playlist>
                              </Stack>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                      </Card>

                    </Stack>
                    
                    {/* Restore Button*/}
                    <Button variant="contained"
                    sx={{
                      //bottom: 0,
                      left: "4%",
                      position: "absolute",
                      bottom: "1%",
                    }}
                    onClick={() => {
                      restoreTrip(currentTrip.timestamp, currentTrip.email);
                    }}
                    >
                      Restore Trip
                    </Button>
                    {currentTrip.timestamp.toDate().toString()}

                  </CardContent>
                </CardActionArea>
              </Card>
            ))}{" "}
            {/*end of mapping*/}
            <Button
              sx={{
                //bottom: 0,
                right: "4%",
                position: "absolute",
                bottom: "1%",
              }}
              variant="contained"
              onClick={() => {
                deleteAllTripData();
              }}
            >
              Delete History
            </Button>
          </>
        )}
      </Stack>
    </>
  ) : (
    <Loading></Loading>
  );
}
