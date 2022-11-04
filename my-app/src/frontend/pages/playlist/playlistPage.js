import Playlist from "./playlist";

function PlaylistPage() {
  return (
    <Playlist
      src={
        "https://open.spotify.com/embed/playlist/6MFbm7M3XgJUfODFeZNCeU?utm_source=generator"
      }
      text={"Playlist for your current trip"}
    ></Playlist>
  );
}
export default PlaylistPage;
