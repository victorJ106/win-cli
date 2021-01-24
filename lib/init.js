const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const clear =  require('clear');
const chalk = require('chalk');
const clone = require('./util/clone');
const { spawn } = require('child_process');
const fs = require('fs');
const rimfaf = require('rimraf');
const open = require('open');

module.exports = async (name) => {
  clear();
  const welcom = await figlet('win-cli welcom');
  log(welcom);
  log('🔥创建项目：' + name);
  const cwd = `./${name}`;
  // todo: 提示用户是否合并还是删除原文件夹
  if (fs.existsSync(cwd)) {
    console.log('该文件夹已存在，删除中...')
    rimfaf.sync(cwd);
    console.log('删除成功！')
  }
  // await clone('github:PanJiaChen/vue-admin-template', name);
  await clone('github:victorJ106/win-vue', name);
  log('安装依赖...');
  await execCmd('npm', ['install'], { cwd });
  log(`
🎉🎉🎉🎉🎉🎉安装完成啦：

=================

cd ${name}
npm run dev

=================

  `);

  // 自动打开浏览器，并运行项目
  open('http://localhost:3000');
  await execCmd('npm', ['run', 'dev'], { cwd });
}

function log(content) {
  console.log(chalk.green(content));
}

function execCmd(...args) {
  let option = args[args.length - 1];
  // 在 shell 中运行 command
  if (process.platform === 'win32') {
    option.shell = true;
  }
  return new Promise((resolve) => {
    const cmd = spawn(...args);
    cmd.stdout.pipe(process.stdout);
    cmd.stderr.pipe(process.stderr);
    cmd.on('close', () => {
      resolve();
    })
  })
}