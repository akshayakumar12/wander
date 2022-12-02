import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { auth, db } from "../../../firebase";
import SpotifyGetPlaylists2 from "../quiz/create_playlist2";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Playlist(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const link =
    location.state === null
      ? props.src //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator" //better way of setting default (maybe have current object)
      : location.state.Playlist;
  let x =
    location.state === null
      ? props.past
      : location.state.Past
      const [userInfo, setUserInfo] = useState("");
      const getData = async () => {
      console.log("Logging Data");
      const response = db.collection("users");
      const data = await response.get();
      data.docs.forEach((item) => {
        if (item.data().email == auth.currentUser.email) {
          setUserInfo(item.data());
          console.log("Logging Current Token");
          console.log(userInfo);
          console.log(userInfo);
        }
      });
      };
      
  function SendMail()
  {
      //var body = document.getElementById("Message").value;
      //var SubjectLine = document.getElementById("Subject").value;
      window.location.href = "mailto:"+auth.currentUser.email+"?subject=Your Custom Spotify Playlist!&body="+link;
  }

  useEffect(() => {
    getData();
  }, [])

  //console.log(location);
  return (
    <div>
      <h2>{props.text}</h2>
      <body>
        <iframe
          src={
            //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator"
            x ? link : userInfo.playlist
          }
          width="100%"
          height={700}
        ></iframe>
      </body>

    <Button
      sx={{
        //bottom: 0,
        //right: "4%",
        //position: "absolute",
        bottom: "1%",
      }}
      variant="contained"
      onClick={() => {
        SendMail();
        alert("Please press send on the generated email to send yourself the playlist.")
      }}
    >
    Send playlist to yourself
  </Button>

  <Button
      sx={{
        //bottom: 0,
        //right: "4%",
        //position: "absolute",
        bottom: "1%",
      }}
      variant="contained"
      onClick={() => {navigate('/quiz')}}
    >
    Retake Quiz
  </Button>

  <SpotifyGetPlaylists2></SpotifyGetPlaylists2>

  </div>
  );
}
export default Playlist;
