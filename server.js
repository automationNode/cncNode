let express = require("express");
const app = express();

async function start(configuration, package, serial) {
  app.use(express.static("public"));
  app.use(express.json());

  app.post("/data", async (request, response) => {
    console.log("-->Input: ", request.body);
    let returnJson = request.body;

    if (returnJson["getServerPackage"]) {
      returnJson["data"] = package;
      returnJson["return"] = true;
    }

    if (returnJson["getServerConfiguration"]) {
      returnJson["data"] = configuration;
      returnJson["return"] = true;
    }

    if (returnJson["getCommunicationStatus"]) {
      returnJson["data"] = await serial.getStatus();
      returnJson["return"] = true;
    }

    if (returnJson["startCommunication"]) {
      returnJson["data"] = await serial.start(configuration.cnc.port);
      returnJson["return"] = true;
    }

    if (returnJson["endCommunication"]) {
      returnJson["data"] = await serial.end();
      returnJson["return"] = true;
    }

    if (returnJson["writeMessage"]) {
      let message = String(returnJson["message"]);
      returnJson["data"] = await serial.writeMessage(message);
      returnJson["return"] = true;
    }

    if (returnJson["getHistoryMessage"]) {
      returnJson["data"] = await serial.getHistoryMessage();
      returnJson["return"] = true;
    }

    if (returnJson["getLastMessage"]) {
      returnJson["data"] = await serial.getLastMessage();
      returnJson["return"] = true;
    }

    if (returnJson["getLastEndLineMessage"]) {
      returnJson["data"] = await serial.getLasEndLineMessage();
      returnJson["return"] = true;
    }

    console.log("-->Output: ", returnJson);
    response.send(returnJson);
  });

  return await new Promise((resolve, reject) => {
    app.listen(configuration.server.port, () => {
      let returnData = { return: true, port: configuration.server.port };
      console.log("-->server running:", returnData);
      resolve(returnData);
    });
  });
}

module.exports = { start };
