import { Card, CardContent } from "@mui/material";
import { Container, Stack } from "@mui/system";

function Home() {
  return (
    <>
      <br></br>
      <Container sx={{ maxWidth: 500 }}>
        <h3>Current Trip</h3>
        <Stack direction={"row"} spacing={4}>
          <Stack direction={"column"}>
            <Stack>
              <Card>
                <CardContent>
                  <p>Source Location</p>
                  <br></br>
                  <p>Destination</p>
                </CardContent>
              </Card>
            </Stack>
            <br></br>
            <Stack>
              <Card>Playlist</Card>
            </Stack>
          </Stack>
          <br></br>
          <Stack>
            <Card>Map</Card>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
export default Home;
