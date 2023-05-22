console.log("-->starting software");

let server = require("./server");
let window = require("./window");
let serial = require("./serial");
let fs = require("fs-extra");
const { wait } = require("./utils");

start();

async function start() {
  let configuration = JSON.parse(
    fs.readFileSync("configuration.json", {
      encoding: "utf-8",
    })
  );
  console.log("-->configuration:", configuration);
  let result = await server.start(configuration.server.port);
  if (result.return) {
    await window.start(
      configuration.server.port,
      configuration.window.size.width,
      configuration.window.size.height,
      configuration.window.autoHideMenuBar
    );
  }

  await serial.start(configuration.cnc.port);
  await wait(2000);
  await serial.writeMessage("$$");
  await wait(100);
  console.log(await serial.getLastMesage());
  
}
