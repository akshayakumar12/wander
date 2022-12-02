import { useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import { auth, db } from "../../../firebase";
import emailjs from "emailjs-com";

function Playlist(props) {
  const location = useLocation();
  const link =
    location.state === null
      ? props.src //"https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator" //better way of setting default (maybe have current object)
      : location.state.Playlist;

  function exportPlaylist() {
    const emailParams = {
      playlist: link,
      userEmail: auth.currentUser.email,
    };

    emailjs
      .send(
        "service_i3qv81i",
        "template_nu65cii",
        emailParams,
        "jJbDp4b8TR2emTjeB"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Your playlist has been sent to your email!");
        },
        (error) => {
          console.log(error.text);
        }
      );
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
        onClick={exportPlaylist}
      >
        Send playlist to yourself
      </Button>
    </div>
  );
}
export default Playlist;
