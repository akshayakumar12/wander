import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
function Result() {
  return (
    <div>
      <h1>These are your current preferences</h1>
      <Stack
        width="50%"
        alignItems="flex-start"
        spacing={4}
        direction="column"
        marginLeft="2%"
      >
        <Card>
          <CardContent>Country</CardContent>
        </Card>

        <Card>
          <CardContent>Christain Rock</CardContent>
        </Card>

        <Card>
          <CardContent>Mongolian Throat Singing</CardContent>
        </Card>

        <Card>
          <CardContent>EDM</CardContent>
        </Card>
      </Stack>
    </div>
  );
}
export default Result;
