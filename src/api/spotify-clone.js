const express = require("express");
const axios = require("axios");

const router = express.Router();

const MAP_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

router.get("/", async (req, res, next) => {
  console.log("Spotify Client ID request received");
  return res.send(process.env.SPOTIFY_CLIENT_ID);
});

try {
  router.get("/weather/:city", async (req, res, next) => {
    const { data } = await axios.get(
      `${WEATHER_URL}${req.params.city},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`
    );
    console.log("Sending weather data to client:", data);
    res.json(data);
  });
} catch (err) {
  res.send(err);
}

module.exports = router;
