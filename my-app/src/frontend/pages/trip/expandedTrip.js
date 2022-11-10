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
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";

export default function ExpandedTrip() {
  const navigate = useNavigate();

  const [pastTrip, setPastTrip] = useState("");
  const getData = async () => {
    const response = db.collection("pastTrips");
    const data = await response.get();
    data.docs.forEach((item) => {
      if (
        item.data().email == auth.currentUser.email &&
        item.data().latest == "true"
      ) {
        setPastTrip(item.data());
        console.log();
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const editTrip_click = () => {
    navigate("/tripview");
  };

  return (
    <>
      <Box
        position="absolute"
        zIndex={0}
        width="100%"
        height="1000px"
        color="gray"
        sx={{ backgroundColor: "gray" }}
      ></Box>

      {/* front stack */}
      <Stack position="absolute" paddingLeft="5%" width="60%" zIndex={1}>
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
              <Stack direction="row" width="100%">
                <Stack width="80%">
                  <p
                    align="Left"
                    style={{
                      fontSize: "20px",
                      marginBottom: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Source: {pastTrip?.source}
                  </p>
                  <p
                    align="Left"
                    style={{
                      fontSize: "20px",
                      marginTop: 30,
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Destination: {pastTrip?.destination}
                  </p>
                </Stack>
                <Stack width="10%">
                  <Button variant="contained" onClick={editTrip_click}>
                    Edit
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
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
          <CardActionArea
            onClick={() => navigate("../playlist")}
            sx={{ paddingBottom: "2%" }}
          >
            <Playlist src="https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator"></Playlist>
          </CardActionArea>
        </Card>
      </Stack>
    </>
  );
}
