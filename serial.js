let serialPort = require("serialport");

let communication;
let lastEndLineMessage = "";
let lastMessage = "";

async function start(port = "COM3") {
  communication = new serialPort.SerialPort({
    path: port,
    baudRate: 115200,
  });

  let result = new Promise((resolve, reject) => {
    communication.on("open", () => {
      communication.on("data", (buffer) => {
        let string = buffer.toString();
        for (let char of string) {
          lastMessage += char;
          if (char == "\n") {
            lastEndLineMessage = "";
          } else {
            lastEndLineMessage += char;
          }
        }
      });
      resolve(communication);
    });
  });

  return result;
}

async function writeMessage(message = "") {
  return new Promise((resolve, reject) => {
    communication.write(message + "\n", function (error) {
      if (error) {
        reject({ return: false, data: error.message });
      }
      resolve({ return: true, data: message });
    });
  });
}

async function getLastEndLineMessage() {
  return lastEndLineMessage;
}

async function getLastMesage() {
  let returnMessage = lastMessage;
  lastMessage = "";
  return returnMessage;
}

async function end() {
  communication.close();
}

module.exports = {
  start,
  end,
  getLastMesage,
  getLastEndLineMessage,
  writeMessage,
};
