let fs = require("fs-extra");
start();

async function start() {
  console.log("-->Reordering files end compiling");
  let directories = await fs.readdir("distributions");
  console.log(directories);
  for (let directory of directories) {
    let result = fs.copySync(
      `${__dirname}/distributions/${directory}/resources/app`,
      `${__dirname}/distributions/${directory}`,
      { overwrite: true }
    );
    console.log(result);
  }
}
