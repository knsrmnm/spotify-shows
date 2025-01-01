import axios from "axios";

class SpotifyClient {
  private token!: string;

  static async initialize(): Promise<SpotifyClient> {
    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("client_id", import.meta.env.VITE_SPOTIFY_CLIENT_ID);
    data.append("client_secret", import.meta.env.VITE_SPOTIFY_CLIENT_SECRET);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      data.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const spotify = new SpotifyClient();
    spotify.token = response.data.access_token;
    return spotify;
  }

  getToken(): string {
    return this.token;
  }
}

const spotify = await SpotifyClient.initialize();
export default spotify;
