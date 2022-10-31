import { Button, Card, CardActionArea, Container } from "@mui/material";
import { Stack } from "@mui/system";

function quizHistory() {
  return (
    <Container>
      <Stack
        alignItems={"flex-start"}
        style={{ marginLeft: "50px", marginRight: "50px" }}
      >
        <h1>Past Quiz Preferences</h1>
      </Stack>

      <Stack
        justifyContent="center"
        direction={"column"}
        spacing={4}
        alignItems="center"
        marginTop={4}
      >
        <Card sx={{ padding: "1%" }}>
          <CardActionArea>
            <h4 align="left">Quiz taken for trip "Chicago":</h4>
            <body>
              <ul align="left">
                <li>Genre</li>
                <li>Mood</li>
                <li>Favorite Artist</li>
                <li>Type of travel</li>
                <li>Purpose of Trip</li>
              </ul>
            </body>
          </CardActionArea>
        </Card>
        <Card sx={{ padding: "1%" }}>
          <CardActionArea>
            <h4 align="left">Quiz taken for trip "Chicago":</h4>
            <ul align="left">
              <li>Genre</li>
              <li>Mood</li>
              <li>Favorite Artist</li>
              <li>Type of travel</li>
              <li>Purpose of Trip</li>
            </ul>
          </CardActionArea>
        </Card>
        <Card sx={{ padding: "1%" }}>
          <CardActionArea>
            <h4 align="left">Quiz taken for trip "Chicago":</h4>
            <ul align="left">
              <li>Genre</li>
              <li>Mood</li>
              <li>Favorite Artist</li>
              <li>Type of travel</li>
              <li>Purpose of Trip</li>
            </ul>
          </CardActionArea>
        </Card>
      </Stack>

      <Button
        sx={{ bottom: 0, right: "4%", position: "absolute", bottom: "1%" }}
        variant="contained"
      >
        Delete History
      </Button>
    </Container>
  );
}

export default quizHistory;
