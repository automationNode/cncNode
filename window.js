
let electron = require("electron");
let server = require("./server");
let utils = require("./utils");

electron.app.on("ready", async ()=>{
    const window = new electron.BrowserWindow({ width: 800, height: 600, autoHideMenuBar: true, icon: "icon.png" });
    await utils.wait(1000);
    window.loadURL(`http://localhost:${server.port}`);
});