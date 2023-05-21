let express = require("express");
const app = express();

async function start(port = 3000) {
  app.use(express.static("public"));
  return await new Promise((resolve, reject) => {
    app.listen(port, () => {
      let returnData = { return: true, port: port };
      console.log("-->server running:", returnData);
      resolve(returnData);
    });
  });
}

module.exports = { start };
