import Button from "@mui/material/Button";

function Playlist(props) {
  return (
    <div>
      <h2>{props.text}</h2>
      <body>
        <iframe
          src={props.src}
          width="100%"
          height={700}
        ></iframe>
      </body>
    </div>
  );
}
export default Playlist;
