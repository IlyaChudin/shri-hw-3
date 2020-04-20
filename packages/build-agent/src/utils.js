const tmp = require("tmp");
const { exec } = require("child_process");

const execInTempPath = (command, maxBuffer = 10 * 1024 * 1024) =>
  new Promise((resolve, reject) => {
    tmp.dir({ unsafeCleanup: true }, (error, cwd, cleanupCallback) => {
      if (error) {
        reject(error);
      } else {
        exec(command, { maxBuffer, cwd }, (err, stdout, stderr) => {
          cleanupCallback();
          resolve({
            code: (err && err.code) || 0,
            log: `${stdout}\n${stderr}`.trim()
          });
        });
      }
    });
  });

module.exports = {
  execInTempPath
};
