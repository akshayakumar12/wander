import { Card, CardActionArea, CardContent, Button } from "@mui/material";
import { Container, Stack } from "@mui/system";
import Playlist from "../playlist/playlist";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <>
      <br></br>
      <Container sx={{ maxWidth: 500 }}>
        <h1>Current Trip</h1>
        <Stack direction={"row"} spacing={4}>
          <Stack direction={"column"}>
            <Stack>
              <Card>
                <CardActionArea onClick={() => navigate("../tripview")}>
                  <CardContent>
                    <p align="Left" style={{ fontSize: "20px" }}>
                      Source Location:
                    </p>
                    <br></br>
                    <p align="Left" style={{ fontSize: "20px" }}>
                      Destination:
                    </p>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Stack>
            <br></br>
            <Stack>
              <Card>
                <CardActionArea onClick={() => navigate("../playlist")}>
                  <Playlist></Playlist>
                </CardActionArea>
              </Card>
            </Stack>
          </Stack>
          <br></br>
          <Stack>
            <Card sx={{ minWidth: 400, minHeight: 200 }}>Map</Card>
            <Button
              variant="contained"
              sx={{ width: 200, padding: 2, margin: 2 }}
              onClick={() => navigate("/quiz")}
            >
              {" "}
              {"Take Quiz"}
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
export default Home;
