const express = require("express");

const marsWeather = require("./mars-weather");
const projectWishlist = require("./project-wishlist");
const browserHomepage = require("./browser-homepage");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello From Tim's Proxy Server",
  });
});

router.use("/mars-weather", marsWeather);
router.use("/project-wishlist", projectWishlist);
router.use("/browser-homepage", browserHomepage);

module.exports = router;
