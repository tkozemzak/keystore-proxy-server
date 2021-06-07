const app = require("./app");
const https = require("https");
const fs = require("fs");
const path = require('path')

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const port = process.env.PORT || 8000;
console.log("dotenv", process.env.PORT);


// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };


// https
//   .createServer(
//     options,
//     app
//   ).
  
  app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
