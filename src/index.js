const app = require("./app");
const https = require("https");
const fs = require("fs");
const cors = require('cors')

const port = process.env.PORT || 8000;

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
