import Button from "@mui/material/Button";

function Playlist() {
  return (
    <div>
      <h1>Playlist for your current trip</h1>
      <body>
        <iframe
          style="border-radius:12px"
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXca8AyWK6Y7g?utm_source=generator"
          width="100%"
          height="380"
          frameBorder="0"
          allowfullscreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </body>
      <Button>Edit playlist</Button>
      <h3>Other information for this trip</h3>
      <p>Date</p>
      <p>Starting point</p>
      <p>Ending point</p>
    </div>
  );
}
export default Playlist;
