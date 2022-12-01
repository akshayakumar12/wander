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

function Home() {
  //window.location.reload(false);
  const navigate = useNavigate();
  let location = useLocation();

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
  }, [location]);

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
            bgcolor: "#F5F7FA",
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
                              {
                                //<iframe src="https://embed.waze.com/iframe?zoom=12&lat=45.6906304&lon=-120.810983"width="300" height="400"></iframe>
                              }

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
                                  Playlist: pastTrip?.playlist
                                },
                              })
                            }
                            sx={{ paddingBottom: "2%" }}
                          >
                            <Playlist
                              text={"Playlist for your current trip"}
                              src={pastTrip?.playlist}
                            ></Playlist>

                          </CardActionArea>
                        </Card>
                      </Stack>
                    </Stack>
                    <br></br>
                    <Stack>
                      <Card
                        sx={{
                          width: { sm: 500, xs: 250 },
                          minHeight: 290,
                          boxShadow: "3",
                          borderRadius: "16px",
                          padding: 1,
                        }}
                      >
                        <h3 align="left" style={{ marginLeft: "5%", fontSize: "20px" }}>
                          Map
                        </h3>
                        {
                          <iframe
                            src="https://embed.waze.com/iframe?zoom=12&lat=45.6906304&lon=-120.810983"
                            width="400"
                            height="300"
                          ></iframe>
                        }
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
