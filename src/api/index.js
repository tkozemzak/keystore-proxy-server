const express = require("express");

const marsWeather = require("./mars-weather");
const projectWishlist = require("./project-wishlist");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello From Tim's Proxy Server",
  });
});

router.use("/mars-weather", marsWeather);
router.use("/project-wishlist", projectWishlist);

module.exports = router;
