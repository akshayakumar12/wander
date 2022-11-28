import { useLocation } from "react-router-dom";

function Playlist(props) {
  const location = useLocation();
  const link =
    location.state === null
      ? "https://open.spotify.com/embed/playlist/4WD1BEKXBaXT7NwXa6RNfU?si=d7baa3d91bcb4429?utm_source=generator" //better way of setting default (maybe have current object)
      : location.state.Playlist;
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
    </div>
  );
}
export default Playlist;
