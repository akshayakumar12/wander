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
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { useLocation } from "react-router-dom";

function Home() {
  //window.location.reload(false);
  const navigate = useNavigate();
  let location = useLocation();

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
      }
    });
  };

  useEffect(() => {
    getData();
  }, [location]);

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
        <CardContent sx={{ marginX: "1%" }}>
          {" "}
          <h2
            align="Left"
            style={{ fontSize: "35px", marginTop: 0, marginBottom: 20 }}
            onClick={() => {
              navigate("../expandedTrip");
            }}
          >
            Current Trip
          </h2>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}>
            <Stack direction={"column"} spacing={2}>
              <Stack>
                <Card
                  sx={{
                    boxShadow: "3",
                    borderRadius: "16px",
                  }}
                >
                  <CardActionArea
                    onClick={() => {
                      navigate("/tripview");
                    }}
                  >
                    <CardContent>
                      <p
                        align="Left"
                        style={{
                          fontSize: "17px",
                          marginTop: 0,
                          fontWeight: "bold",
                        }}
                      >
                        Source: {pastTrip?.source}
                      </p>
                      {
                        //<iframe src="https://embed.waze.com/iframe?zoom=12&lat=45.6906304&lon=-120.810983"width="300" height="400"></iframe>
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
                        Destination: {pastTrip?.destination}
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
                    <Playlist
                      text={"Playlist for your current trip"}
                      src="https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator"
                    ></Playlist>
                  </CardActionArea>
                </Card>
              </Stack>
            </Stack>
            <br></br>
            <Stack>
              <Card
                sx={{
                  width: { sm: 500, xs: 250 },
                  minHeight: 290,
                  boxShadow: "3",
                  borderRadius: "16px",
                }}
              >
                <h3 align="left" style={{ marginLeft: "5%", fontSize: "20px" }}>
                  Map
                </h3>
              </Card>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        justifyContent="flex-start"
        sx={{
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
