const path = require("path");
const shelljs = require("shelljs");
// const rimraf = require("rimraf");

// const exec = (cmd) => {
//   const res = shelljs.exec(cmd);
//   if (res.code !== 0) {
//     throw new Error(`exec "${cmd}" failed.`);
//   }
// };

const release = () => {
  const buildDir = path.resolve(__dirname, "../build/*");
  const distDir = path.resolve(__dirname, "../dist/");
  shelljs.rm("-rf", distDir);
  shelljs.mkdir("-p", distDir);
  shelljs.mv(buildDir, distDir);
};

release();
