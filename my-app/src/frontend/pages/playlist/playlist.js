import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { auth, db } from "../../../firebase";

function Playlist(props) {
  const location = useLocation();
  const link =
    location.state === null
      ? props.src //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator" //better way of setting default (maybe have current object)
      : location.state.Playlist;

  
  function SendMail()
  {
      //var body = document.getElementById("Message").value;
      //var SubjectLine = document.getElementById("Subject").value;
      window.location.href = "mailto:"+auth.currentUser.email+"?subject=Your Custom Spotify Playlist!&body="+link;
  }

  //console.log(location);
  return (
    <div>
      <h2>{props.text}</h2>
      <body>
        <iframe
          src={
            //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator"
            link
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
      }}
    >
    Send playlist to yourself
  </Button>
  </div>
  );
}
export default Playlist;
