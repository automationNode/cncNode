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
let buttonConnect = document.getElementById("buttonConnect");
let selectPort = document.getElementById("selectPort");

buttonConnect.addEventListener("click",async function(){
  console.log(selectPort.value);
  await utils.fetchServer({ startCommunication: true, port: selectPort.value });
});


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
      buttonConnect.style.display = "none";
      selectPort.style.display = "none";
    }else{
      divCommunicationStatus.classList.remove("bg-success");
      divCommunicationStatus.classList.add("bg-danger");
      divCommunicationStatus.classList.remove("bg-dark");
      divCommunicationStatus.innerText = "Disconnected";
      buttonConnect.style.display = "block";
      selectPort.style.display = "block";
    }
  }, 500);
  setInterval(async function(){
    let ports = await utils.fetchServer({ getCommunicationPorts: true });
    if(ports.return){
      selectPort.innerHTML = "";
      if(ports.data.length > 0){
        for(let port of ports.data){
          selectPort.innerHTML += `<option value="${port.path}">${port.path} - ${port.vendorId}</option>`;
        }
      }else{
        selectPort.innerHTML += `<option>No ports available</option>`;
      }
    }
  }, 1000); 
}
