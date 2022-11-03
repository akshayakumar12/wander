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
  return (
    <>
      <Stack alignItems={"center"} marginTop="2%" spacing={2}>
        <h1 align="left">Past Trips</h1>
        {/* Outer Card */}
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
                          Source Location
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
                          Destination
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
                  >
                    <CardContent width="100%" height="1000px">
                      <Stack
                        direction="row"
                        width="100%"
                        height="100%"
                        justifyContent="center"
                      >
                        <p
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
                        </p>
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
}

/*;*/
