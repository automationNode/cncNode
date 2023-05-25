let fs = require("fs-extra");

function getServerConfiguration() {
  let serverConfiguration = JSON.parse(
    fs.readFileSync("./configuration.json", {
      encoding: "utf-8",
    })
  );
  return serverConfiguration;
}

function getServerPackage() {
  let serverPackage = JSON.parse(
    fs.readFileSync("./package.json", {
      encoding: "utf-8",
    })
  );
  return serverPackage;
}

function setServerConfiguration(newConfiguration) {
  fs.writeFileSync(`./configuration.json`, JSON.stringify(newConfiguration), {
    encoding: "utf-8",
  });
  return newConfiguration;
}

module.exports = {
  getServerConfiguration,
  getServerPackage,
  setServerConfiguration,
};
