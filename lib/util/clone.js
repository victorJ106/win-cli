const { promisify } = require('util');
const ora = require('ora');

module.exports = async (url, dir) =>  {
  const clone = promisify(require('download-git-repo'));
  const process = ora('下载代码...' + url);
  process.start();
  await clone(url, dir);
  process.succeed();
}