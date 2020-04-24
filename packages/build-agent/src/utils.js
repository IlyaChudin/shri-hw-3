const tmp = require("tmp");
const { exec } = require("child_process");

const execInTempPath = (command, maxBuffer = 10 * 1024 * 1024) =>
  new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (error, cwd, cleanupCallback) => {
      if (error) {
        reject(error);
      } else {
        let log = "";
        const child = exec(command, { maxBuffer, cwd });
        child.stdout.on("data", data => {
          log += data.toString();
        });
        child.stderr.on("data", data => {
          log += data.toString();
        });
        child.on("exit", code => {
          cleanupCallback();
          resolve({ code, log });
        });
      }
    });
  });

module.exports = {
  execInTempPath
};
