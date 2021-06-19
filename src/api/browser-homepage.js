const express = require("express");
const axios = require("axios");
const knex = require("../../knex");
const e = require("express");
const { CLIEngine } = require("eslint");

const router = express.Router();

const MAP_URL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=`;

router.get("/", async (req, res, next) => {
  return res.send("Hello");
});
//-------------
//WEATHER WIDGET
router.get("/geomap/:lat/:long", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `${MAP_URL}${req.params.lat},${req.params.long}&sensor=true&key=${process.env.GOOGLE_GEOCODE_API_KEY}`
    );
    console.log('data from Google API', data)
    let foundCity = data.results[0].address_components[3].short_name;
    console.log("Sending location data to client:", foundCity);
    return res.json(foundCity);
  } catch(err) {
    console.log("Error", err)
    res.status(404)
  }
  
});


  router.get("/weather/:city", async (req, res, next) => {
    try {
      const { data } = await axios.get(
        `${WEATHER_URL}${req.params.city},us&appid=${process.env.WEATHER_API_KEY}&units=imperial`
      );
      console.log("Sending weather data to client:", data);
      res.json(data);
    } catch(err) {
      console.log("Error", err)
      res.status(404)
    }

  })
    
 

//--------
//TODOS WIDGET

//check login

router.post("/todos/check-login/:id", async (req, res) => {
  console.log("req.BODY", req.body)

  try {
    let userFromDb = await knex('users').where('id', req.params.id)

    console.log('user from db', userFromDb);

    if (userFromDb[0].email !== req.body.email) {
      res.status(200).send(false)
    } else {
      res.status(200).send(true)
    }
  } catch (err) {
    res.status(200).send({ message: "Error login status"})
  }
 
})

//login
router.post("/todos/login", async (req, res) => {
  console.log("req.BODY", req.body)

  if (!req.body.password.length || !req.body.email.length) {
    res.status(200).send({message: "Empty Fields"})
  } else {
    try {
      let userFromDb = await knex('users').where('email', req.body.email)

      if (!userFromDb[0]) {
        console.log("User not found")
        res.status(200).send({message: "User Not Found"})
      } else {
        if (userFromDb[0].password === req.body.password) {
          console.log(`Password Matches for user:  ${userFromDb[0].email}`);
          //remove password from object and send to client
          delete userFromDb[0].password;
          res.status(200).send(userFromDb[0])
        } else {
          console.log("Wrong Password");
          res.status(200).send({message: "Wrong Password"})
  
        }
      }
    
       
   } catch (err){
     console.log("Error", err);
     res.status(404)
   }
  }
})


//signup
router.post("/todos/signup", async (req, res) => {
  console.log("req.BODY", req.body)

  let newUser = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "password": req.body.password,
    "created_at": req.body.created_at,
  }
    try {
//check for existing user in DB
      
      let userFromDb = await knex('users').where('email', newUser.email).returning('id')
      // .then((id)=> {
      //   newUser.id = id;
      // })
      console.log('user from DB', userFromDb)

      if(userFromDb && userFromDb.length) {
        res.status(200).send({message: "User already exists"})
      } else {
//if user doesn't exist in db, create new user
        await knex('users').insert(newUser)
//retrieve new user from db so that id exists in object
        let insertedUser = await knex('users').where('email', newUser.email)
        console.log("insertedUser", insertedUser)
        res.status(200).send(insertedUser[0])
      }
   } catch (err){
    console.log("Error", err);
    res.status(404)
  }
  
})

//Retrieve all todos for a user
router.get("/todos/:id", async (req, res) => {
 
  try {
    const todosListFromDb = await knex('todos').where({'user_id': req.params.id})
    console.log("todosListFromDb", todosListFromDb);
    res.send(todosListFromDb)
  } catch (err){
    console.log("Error", err);
    res.status(404)
  }
  
})

//Receive new todo and enter into db
router.post("/todos/:id", async (req, res) => {
  console.log("req.BODY", req.body)

  let newTodo = {
    "title": req.body.title,
    "user_id": req.params.id,
    "completed": 0,
    "created_at": req.body.created_at
  }

  try {
    await knex('todos').insert(newTodo).returning('id').then((id)=> {
      console.log(`ENTERED TODO INTO DB. TODO ID:  ${id}`);
      res.status(200).send(id)
  })
  } catch (err){
    console.log("Error", err);
    res.status(404)
  }


})

//Receive updated todo data and update in db
router.put("/todos/:id/:todoid", async (req, res) => {

  let updatedTodo = {
    "title": req.body.title,
    "additionalInfo": req.body.additionalInfo,
    "user_id": req.params.id,
    "completed": req.body.completed
    
  }

  try {

      await knex('todos').where('id', req.params.todoid).update(updatedTodo).returning('id').then((id)=> {
        console.log(`UPDATED TODO IN DB. TODO ID:  ${id}`)
        res.status(200)
      }) 
  } catch (err){
    console.log("Error", err);
    res.status(404)
  }
})

//Delete a todo from DB
router.delete("/todos/:id/:todoid", async (req, res) => {
  try {
      await knex('todos').where('id', req.params.todoid).del().returning("id").then((id)=> {
        if (id.length) {
          console.log(`DELETED TODO IN DB. TODO ID:  ${id}`)
          res.status(200).send({message: "Successfully Deleted"})
        } 
        else {
          console.log(`TODO with ID ${req.params.todoid} not found in Database`)

          res.status(404).send({message: "Todo not found in Database"})

        }
      })
  
    
  } catch (err){
    console.log("Error", err);
    res.status(404)
  }

})

//NEWS

//Fetch top news stories
router.get("/news/top", async (req, res) => {

  try {
    let topStoriesFromApi = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)

    console.log("topStoriesFromApi", topStoriesFromApi.data.articles[0])
  
    res.send(topStoriesFromApi.data)
  } catch (err){
    console.log("Error", err);
    res.status(404)
  }

})


module.exports = router;
