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
function Home() {
  const navigate = useNavigate();
  return (
    <Stack alignItems={"center"}>
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
            {" "}
            <h2
              align="Left"
              style={{ fontSize: "35px", marginTop: 0, marginBottom: 20 }}
              onClick={() => navigate("../expandedTrip")}
            >
              Current Trip
            </h2>
            <Stack direction={"row"} spacing={4}>
              <Stack direction={"column"} spacing={2}>
                <Stack>
                  <Card
                    sx={{
                      boxShadow: "3",
                      borderRadius: "16px",
                    }}
                  >
                    <CardActionArea onClick={() => navigate("../tripview")}>
                      <CardContent>
                        <p
                          align="Left"
                          style={{
                            fontSize: "17px",
                            marginBottom: 20,
                            fontWeight: "bold",
                          }}
                        >
                          Source Location:
                        </p>
                          {//<iframe src="https://embed.waze.com/iframe?zoom=12&lat=45.6906304&lon=-120.810983"width="300" height="400"></iframe>
                          }
                        <p
                          align="Left"
                          style={{
                            fontSize: "17px",
                            marginTop: 30,
                            margin: 0,
                            fontWeight: "bold",
                          }}
                        >
                          Destination:
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
                      onClick={() => navigate("../playlist")}
                      sx={{ paddingBottom: "2%" }}
                    >
                      <Playlist></Playlist>
                    </CardActionArea>
                  </Card>
                </Stack>
              </Stack>
              <br></br>
              <Stack>
                <Card
                  sx={{
                    maxWidth: 500,
                    minWidth: 500,
                    minHeight: 290,
                    boxShadow: "3",
                    borderRadius: "16px",
                  }}
                >
                  <h3
                    align="left"
                    style={{ marginLeft: "5%", fontSize: "20px" }}
                  >
                    Map
                  </h3>
                </Card>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>

      <Button
        variant="contained"
        sx={{
          marginRight: "48%",
          marginTop: "1%",
          bgcolor: "#007A1B",
          textTransform: "none",
          fontSize: "20px",
        }}
        onClick={() => navigate("/newtrip")}
        size="large"
      >
        Create New Trip
      </Button>
    </Stack>
  );
}
export default Home;

/*;*/
