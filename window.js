let electron = require("electron");
let utils = require("./utils");

async function start(
  port = 3000,
  width = 500,
  height = 500,
  autoHideMenuBar = true
) {
  electron.app.on("ready", async () => {
    const window = new electron.BrowserWindow({
      width,
      height,
      autoHideMenuBar: autoHideMenuBar,
      icon: "./icon.png",
    });
    window.loadURL(`http://localhost:${port}`);
  });
}

module.exports = { start };
