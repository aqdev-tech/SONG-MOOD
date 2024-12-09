const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Mood Tracker API is running!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const SpotifyWebApi = require("spotify-web-api-node");

// Configure Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Authenticate with Spotify
spotifyApi.clientCredentialsGrant().then(
  (data) => {
    spotifyApi.setAccessToken(data.body["access_token"]);
    console.log("Spotify API authenticated successfully");
  },
  (err) => {
    console.error("Spotify authentication error:", err);
  }
);

// Route to Get Songs by Mood
app.get("/songs/:mood", async (req, res) => {
  const { mood } = req.params;
  try {
    const response = await spotifyApi.searchPlaylists(mood, { limit: 5 });
    res.json(response.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch songs" });
  }
});
