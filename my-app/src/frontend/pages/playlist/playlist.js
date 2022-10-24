import Button from "@mui/material/Button";

function Playlist() {
  return (
    <div>
      <h2>Playlist for your current trip</h2>
      <body>
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXca8AyWK6Y7g?utm_source=generator"
          width="100%"
          height={700}
        ></iframe>
      </body>
    </div>
  );
}
export default Playlist;
