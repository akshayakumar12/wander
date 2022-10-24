import { Card, CardActionArea, CardContent, Button } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Playlist from "../playlist/playlist";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <Stack alignItems={"center"}>
      <Card
        sx={{
          marginTop: "5%",
          width: "60%",
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
            <h1 align="Left" style={{ fontSize: "40px" }}>
              Current Trip
            </h1>
            <Stack direction={"row"} spacing={4}>
              <Stack direction={"column"} spacing={4}>
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
                            fontSize: "20px",
                            margin: 0,
                            fontWeight: "bold",
                          }}
                        >
                          Source Location:
                        </p>
                        <br></br>
                        <p
                          align="Left"
                          style={{
                            fontSize: "20px",
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
                      maxHeight: 130,
                      margin: "1%",
                      maxWidth: 800,
                      boxShadow: "3",
                      borderRadius: "16px",
                    }}
                  >
                    <CardActionArea onClick={() => navigate("../playlist")}>
                      <Playlist></Playlist>
                    </CardActionArea>
                  </Card>
                </Stack>
              </Stack>
              <br></br>
              <Stack>
                <Card
                  sx={{
                    width: 500,
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
          marginRight: "49%",
          marginTop: "1%",
          bgcolor: "#007A1B",
          textTransform: "none",
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
