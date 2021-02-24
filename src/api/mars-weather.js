const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const BASE_URL = "https://api.nasa.gov/insight_weather/?";

let cachedData;
let cacheTime;

router.get("/", async (req, res, next) => {
  //memory cache
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.json(cachedData);
  }

  //request to API
  try {
    const params = new URLSearchParams({
      api_key: process.env.NASA_API_KEY,
      feedtype: "json",
      ver: "1.0",
    });

    const { data } = await axios.get(`${BASE_URL}${params}`);

    //set cache for time and data
    cachedData = data;
    cacheTime = Date.now();
    data.cacheTime = cacheTime;
    //respond to request with data

    return res.json(data);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
