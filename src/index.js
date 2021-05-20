const app = require("./app");
const https = require("https");
const fs = require("fs");
const cors = require('cors')

const port = process.env.PORT || 8000;

<<<<<<< HEAD
app.use(cors());

//https
 // .createServer(
 //   {
 //     key: fs.readFileSync("server.key"),
 //     cert: fs.readFileSync("server.cert"),
  //  },
 //   app
 // )
 app.listen(process.env.PORT || 8000, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
=======
// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key"),
//       cert: fs.readFileSync("server.cert"),
//     },
//     app
//   )
app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening: http://localhost:${port}`);
});
>>>>>>> 420e05ec6c7f457160d26bad2fdeda1b97ec35d3
