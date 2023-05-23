import * as utils from "./utils.js";

let serverConfiguration = {};
let serverPackage = {};

setup();

async function setup() {
  serverPackage = await utils.fetchServer({ getServerPackage: true });
  serverConfiguration = await utils.fetchServer({
    getServerConfiguration: true,
  });

  if (serverPackage.return && serverConfiguration.return) {
    console.log(
      `-->Running ${serverPackage.data.name} version ${serverPackage.data.version}`
    );
    serverPackage = serverPackage.data;
    serverConfiguration = serverConfiguration.data;
    start();
  }
}

let divCommunicationStatus = document.getElementById("divCommunicationStatus");
async function start() {
  setInterval(async function () {
    let communicationStatus = await utils.fetchServer({
      getCommunicationStatus: true,
    });
    if(communicationStatus.return && communicationStatus.data){
        divCommunicationStatus.classList.add("bg-success");
        divCommunicationStatus.classList.remove("bg-danger");
        divCommunicationStatus.classList.remove("bg-dark");
        divCommunicationStatus.innerText = "Connected";
    }else{
        divCommunicationStatus.classList.remove("bg-success");
        divCommunicationStatus.classList.add("bg-danger");
        divCommunicationStatus.classList.remove("bg-dark");
        divCommunicationStatus.innerText = "Disconnected";
    }
  }, 5000);
}
