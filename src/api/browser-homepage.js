const express = require("express");
const axios = require("axios");

const router = express.Router();

const MAP_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

router.get("/geomap/:lat/:long", async (req, res, next) => {
  //

  const { data } = await axios.get(
    `${MAP_URL}${req.params.lat},${req.params.long}&sensor=true&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
  );
  res.json(data);
});

router.get("/weather/:city", async (req, res, next) => {
  const { data } = await axios.get(
    `${WEATHER_URL}${req.params.city},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`
  );
  res.json(data);
});

module.exports = router;
