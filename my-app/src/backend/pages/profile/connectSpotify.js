import SpotifyWebApi from 'spotify-web-api-js'
import {useEffect, useState, setToken} from 'react';

export function AuthenticateUser() {
    const CLIENT_ID = "cd4b2dc4fd9a40d08077c8e883502bc9"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPES = [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state"
    ]

//    window.location.href= `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`

    const [token, setToken] = useState("")

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
            window.location.hash = ""
            window.localStorage.setItem("token", token)
        } else {
            window.location.href= `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`
        }

        setToken(token)

    }, [])

//    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}&response_type=${RESPONSE_TYPE}&show_dialog=true`
}

export function logout() {
    setToken("")
    window.localStorage.removeItem("token")
}