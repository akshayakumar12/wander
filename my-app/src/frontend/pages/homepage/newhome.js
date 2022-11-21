import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router";
function NewHome() {
  const navigate = useNavigate();
  //const navigation = useNavigation();
  return (
    <>
      <Box
        sx={{
          height: "40vh",
          margin: "5%",
          paddingY: "5%",
        }}
      >
        <h1 style={{ fontSize: "100px", margin: 0, padding: 0 }}>
          Welcome to Wander!
        </h1>
        <Button
          size="large"
          variant="contained"
          style={{
            minWidth: "0.5em",
            minHeight: "0.5em",
            fontSize: "39px",
            textTransform: "none",
            marginTop: "5%",
            backgroundColor: "#DE6600",
            borderRadius: "16px",
          }}
          onClick={() =>
            navigate("../playlist", {
              src: "https://open.spotify.com/embed/playlist/6MFbm7M3XgJUfODFeZNCeU?utm_source=generator",
              text: "hello",
            })
          }
        >
          + New Trip
        </Button>
      </Box>
    </>
  );
}
export default NewHome;
