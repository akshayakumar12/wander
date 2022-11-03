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
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";


export default function PastTrips() {
  const navigate = useNavigate();
  const trips = [
		{
			source: "Indiana",
			dest: "Alabama",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?si=552ad61f22504731/?utm_source=generator"
		},
    {
			source: "LA",
			dest: "San Francisco",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZEVXbMDoHDwVN2tF?si=60a9c8c7bc9940f8/?utm_source=generator"
		},
    {
			source: "Ohio",
			dest: "Ohio",
      playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX2L0iB23Enbq?si=5d2cef0520924318?utm_source=generator"
		}
  ];

  return (
    <>
      <Stack alignItems={"center"} marginTop="2%" spacing={2}>
        <h1 align="left">Past Trips</h1>

        {trips.map((currentTrip) => (
            <Card
            sx={{
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
                            {currentTrip.dest}
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
                      onClick={() => 
                        navigate("../playlist")
                      }
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
                          <Playlist 
                            src={currentTrip.playlist}> 
                          </Playlist>
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))} {/*end of mapping*/}
      </Stack>
    </>
  ); 
}

/*;*/
