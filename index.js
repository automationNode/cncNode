console.log("-->starting software");

let server = require("./server.js");
let window = require("./window.js");
let serial = require("./serial.js");
let utils = require("./utils.js");
let fs = require("fs-extra");

start();

async function start() {
  try {
    let configuration = JSON.parse(
      fs.readFileSync("configuration.json", {
        encoding: "utf-8",
      })
    );
    let package = JSON.parse(
      fs.readFileSync("package.json", {
        encoding: "utf-8",
      })
    );
    console.log("-->configuration:", configuration);

    let result = await server.start(configuration, package, serial);
    if (result.return) {
      await window.start(
        configuration.server.port,
        configuration.window.size.width,
        configuration.window.size.height,
        configuration.window.autoHideMenuBar
      );
      await serial.start(configuration.cnc.port);
    }
  } catch (error) {
    console.error(error);
  }
}
