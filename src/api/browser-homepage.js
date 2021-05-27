const express = require("express");
const axios = require("axios");
const knex = require("../../knex")

const router = express.Router();

const MAP_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

router.get("/", async (req, res, next) => {
  return res.send("Hello");
});

//WEATHER WIDGET
router.get("/geomap/:lat/:long", async (req, res, next) => {
  const { data } = await axios.get(
    `${MAP_URL}${req.params.lat},${req.params.long}&sensor=true&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
  );
  let foundCity = data.results[0].address_components[3].short_name;
  console.log("Sending location data to client:", foundCity);
  return res.json(foundCity);
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


//TODOS WIDGET

//Retrieve all todos for a user
router.get("/todos/:id", async (req, res) => {
 
  const todosListFromDb = await knex('todos').where({'user_id': req.params.id})
  console.log("todosListFromDb", todosListFromDb);
  res.send(todosListFromDb)
})

//Receive new todo and enter into db
router.post("/todos/:id", async (req, res) => {
  console.log("req.BODY", req)
  try {

    let newTodo = {
        "title": req.body.title,
        "additionalInfo": req.body.additionalInfo,
        "user_id": req.params.id,
        "completed": 0
      }
  
    await knex('todos').insert(newTodo).returning('id').then((id)=> {
      console.log(`ENTERED TODO INTO DB. TODO ID:  ${id}`);
      res.status(200).send(id)
  })
  } catch (err){
    console.log("ERROR OCCURRED: ", err);
    res.send(err)
  }


})

module.exports = router;
