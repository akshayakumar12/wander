import React, {useState} from "react";
import axios from 'axios';

//const ACCESS_TOKEN = "BQB_beh1V_60gRpN2LWPeYWv119TizcGm_vQQ3KGTBQrJyGQPNi6KDQ-GktV0XvBLQKKLVRMAN61F9C80lf61EvLJO6Nx-NjIRAjNvkucAv17_G8HUx0xB-jWeOGXqoMg1c-jpLiFP1fyHuMC3Jzomqs1ZafOHo-9F7tSYFba-eRdeJibSdPKt2v"

const SpotifyGetPlaylists = () => {
    const ACCESS_TOKEN = "BQDvcV_4OrzR8cIh6XYDpzywbLVSpP1iM7feJZGqhJykW1DdwBNOFXutOMAJ6qfmOYNUUv2IDPjPoaoaTKm7z54wcvAQO6G6DCM9TdZXRk0gbkqTpftWIoPcE6g5ct4oD5LvDwU82T9YTD8r2qJDJnhdpeif9rJHd_y7XpVS9btHG4xr_1qna0AT"
    const [data, setData] = useState({});

    const handleGetPlaylists = () => {
        axios.get("https://api.spotify.com/v1/me/playlists", {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        }).then(response => {
            setData(response.data);
        })
    }

    return <button onClick={handleGetPlaylists}>Get Playlists</button>
}

export default SpotifyGetPlaylists