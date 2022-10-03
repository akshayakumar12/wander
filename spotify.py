import spotipy
from spotipy.oauth2 import SpotifyOAuth

# These libraries are required to interface
# with the API as well as authenticate the user.

# Client ID: cd4b2dc4fd9a40d08077c8e883502bc9
# Client Secret: 5e69ca6de47f4d9589d9d05441a28cfe
# Redirect URI: https://127.0.0.1:8080/

authentication_scope = 'playlist-modify-public'
user_account_id = 'sai1977'

token = SpotifyOAuth(scope=authentication_scope, username=user_account_id)
spotifyObject = spotipy.Spotify(auth_manager=token)

# Note that this stepo of the process could more
# easily be done from the API website, however that
# would create an additional step for the user.

playlist_name = "Test Playlist"
playlist_description = "This is a test playlist screated using Spotify API."

spotifyObject.user_playlist_create(user=user_account_id, name=playlist_name, public=True, description=playlist_description)

songs = ["superstition stevie wonder", "another one bites the dust", "strawberry fields forever"]

prePlaylist = spotifyObject.user_playlists(user=user_account_id)
playlist = prePlaylist['items'][0]['id']

spotifyObject.user_playlist_add_tracks(user=user_account_id, playlist_id=playlist, tracks=songs)