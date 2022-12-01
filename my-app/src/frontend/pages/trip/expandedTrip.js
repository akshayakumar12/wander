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
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d43202.059875133404!2d-122.30670487293368!3d47.40942996790926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x5490594531b30361%3A0x37497b155669fece!2sEFCO%20Corp%2C%203rd%20Avenue%20South%2C%20Kent%2C%20WA!3m2!1d47.370911!2d-122.2354823!4m5!1s0x5490435542eafefd%3A0x99d3d9c4c7dc37b7!2sSeattle-Tacoma%20International%20Airport%20(SEA)%2C%2017801%20International%20Blvd%2C%20Seattle%2C%20WA%2098158!3m2!1d47.4479736!2d-122.3088188!5e0!3m2!1sen!2sus!4v1669870514376!5m2!1sen!2sus&zoom=6"
          width="100%"
          height="100%"
          //style={}
          allowfullscreen="true"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </Box>

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
                  <Box sx={{ borderLeft: 1 }} paddingLeft={1}>
                    <p align="Left">Midpoint 1: </p>
                    <p align="Left">Midpoint 2:</p>
                  </Box>
                  <p
                    align="Left"
                    style={{
                      fontSize: "20px",
                      marginTop: 15,
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
