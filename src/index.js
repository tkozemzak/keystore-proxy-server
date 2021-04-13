const app = require("./app");
const https = require("https");
const fs = require("fs");

const port = process.env.PORT || 8000;

https
  .createServer(
    {
      key: fs.readFileSync("~/projects/keystore-proxy-server/src/server.key"),
      cert: fs.readFileSync("~/projects/keystore-proxy-server/src/server.cert"),
    },
    app
  )
  .listen(process.env.PORT || 8000, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
