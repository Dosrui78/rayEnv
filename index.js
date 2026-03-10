// index.js

// 导包
const fs = require('fs');
const { VM, VMScript } = require('vm2');

// 随机生成变量名
const randomName = require(`${__dirname}/tools/fakeName.js`, 'utf-8').generateRandomWords(1);
console.log('now framework name is ' + randomName + 'Env');

// 创建vm实例
const vm = new VM();

// 读取工具代码 (config + print + proxy + safety + inject)
var configCode = require(`${__dirname}/tools/tools.node.js`).getCode();

// 读取浏览器环境代码
var browserCode = require(`${__dirname}/browser/rayEnv.node.js`).getCode();

// 获取目标代码
const targetName = "ouyeel";
const targetCode = "\r\n" + fs.readFileSync(`${__dirname}/target/${targetName}.js`, 'utf-8');

// 加载目标配置 (仍然作为代码拼接，因为里面调用了 rayEnv.inject)
const targetConfigPath = `${__dirname}/target/${targetName}.config.js`;
let targetConfigCode = "\r\n" + fs.readFileSync(targetConfigPath, 'utf-8');

// 拼接顺序: 工具 → 浏览器环境 → 目标配置 → 目标脚本
const code = configCode + browserCode + targetConfigCode + targetCode;


// 更改变量名称
// const modifiedCode = code.replace(/rayEnv/g, randomName + "Env");

// 执行配置文件
var script = new VMScript(modifiedCode, "debug.js");
fs.writeFileSync(`${__dirname}/debug.js`, script.code);
try {
    vm.run(script);
} catch (err) {
    console.error('Environment Error:', err.stack);
}