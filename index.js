console.log("-->starting software");

let configuration = require("./configuration.js");
let server = require("./server.js");
let window = require("./window.js");
let serial = require("./serial.js");

start();

async function start() {
  try {
    console.log("-->configuration:", configuration.getServerConfiguration());

    let result = await server.start(configuration, serial);
    if (result.return) {
      await window.start(
        configuration.getServerConfiguration().server.port,
        configuration.getServerConfiguration().window.size.width,
        configuration.getServerConfiguration().window.size.height,
        configuration.getServerConfiguration().window.autoHideMenuBar
      );
      await serial.start(configuration.getServerConfiguration().cnc.port);
    }
  } catch (error) {
    console.error(error);
  }
}
