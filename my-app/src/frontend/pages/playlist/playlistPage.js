import Playlist from "./playlist";

function PlaylistPage({ route }) {
  console.log(route.src);
  return <Playlist src={route.src} text={route.text}></Playlist>;
}
export default PlaylistPage;
//("https://open.spotify.com/embed/playlist/6MFbm7M3XgJUfODFeZNCeU?utm_source=generator");
