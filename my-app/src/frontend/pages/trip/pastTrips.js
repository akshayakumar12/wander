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

export default function PastTrips() {
  const navigate = useNavigate();
  const [userPastTrips, setUserPastTrips] = useState([]);
  const [noPast, setNoPast] = useState(false);
  const [show, setShow] = useState(false);

  const getUserPastTripData = async () => {
    try {
      const response = db.collection("pastTrips");
      const data = await response.get();
      const temp = [];
      data.docs.forEach((item) => {
        if (item.data().email == auth.currentUser.email) {
          temp.push(item.data());
        }
      });

      // sort temp by time
      temp.sort((a, b) => b.timestamp - a.timestamp);
      console.log(temp);

      if (temp.length == 0) {
        setNoPast(true);
      }

      setUserPastTrips(temp);
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
        if (item.data().email == auth.currentUser.email) {
          item.ref.delete();
        }
      });

      setNoPast(true);
      setUserPastTrips(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const [filter, setFilter] = React.useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
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
                <MenuItem value={12}>12 Months</MenuItem>
              </Select>
            </FormControl>
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
                  bottom: 0,
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
                  height: "80%",
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
                          width: "70%",
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
                          width: "30%",
                          height: "100%",
                          maxHeight: 140,
                        }}
                      >
                        <CardActionArea
                          width="100%"
                          height="100%"
                          onClick={() => navigate("../playlist")}
                          sx={{ paddingBottom: "2%" }}
                        >
                          <CardContent width="100%" height="1000px">
                            <Stack
                              direction="row"
                              width="100%"
                              height="100%"
                              justifyContent="center"
                            >
                              {/*<p
                            align="center"
                            style={{
                              fontSize: "17px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            <LibraryMusicIcon sx={{ paddingTop: "10%" }} />{" "}
                            Playlist
                          </p>*/}
                              <Playlist src={currentTrip.playlist}></Playlist>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Stack>
                    {currentTrip.timestamp.toDate().toString()}
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}{" "}
            {/*end of mapping*/}
            <Button
              sx={{
                bottom: 0,
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
