import * as utils from "./utils.js";

let communicationOutput = document.getElementById("communicationOutput");
let communicationInput = document.getElementById("communicationInput");
let buttonSend = document.getElementById("buttonSend");

start();

async function start() {
    let historyMessage = await utils.fetchServer({ getHistoryMessage: true });
    historyMessage.value = "";
    if (historyMessage.return) {
        communicationOutput.value = historyMessage.data;
    }
}

buttonSend.addEventListener("click", async function () {
    if (communicationInput.value != "") {
        let writeMessage = await utils.fetchServer({
            writeMessage: true,
            message: communicationInput.value,
        });
        if (writeMessage.return) {
            communicationInput.value = "";
    }
}
});

//communicationOutput.style.height = 20 + communicationOutput.scrollHeight + "px";
let lastHistoryMessage = "";

setInterval(async function () {
    let historyMessage = await utils.fetchServer({
        getHistoryMessage: true,
    });
    if(historyMessage.return){
    if(historyMessage.data != lastHistoryMessage){
        communicationOutput.value = historyMessage.data;
        lastHistoryMessage = historyMessage.data;
        console.log(lastHistoryMessage.length, historyMessage.data.length);
        communicationOutput.scrollTop = communicationOutput.scrollHeight;
    }
  }
}, 350);
