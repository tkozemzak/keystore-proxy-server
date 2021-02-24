const express = require("express");
const axios = require("axios");

const router = express.Router();

const BASE_URL = "https://api.github.com/users/";

router.get("/:user", async (req, res, next) => {
  //

  const { data } = await axios.get(`${BASE_URL}${req.params.user}/repos`, {
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_API_TOKEN,
    },
  });
  res.json(data);
});
router.get("/:user/repos", async (req, res, next) => {
  //

  const { data } = await axios.get(`${BASE_URL}${req.params.user}/repos`, {
    headers: {
      Authorization: "Bearer " + process.env.GITHUB_API_TOKEN,
    },
  });
  res.json(data);
});

module.exports = router;
