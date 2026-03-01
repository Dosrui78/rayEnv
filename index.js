// index.js

// 导包
const fs = require('fs');
const { VM, VMScript } = require('vm2');

// 随机生成变量名
const randomName = require(`${__dirname}/tools/fakeName.js`, 'utf-8').generateRandomWords(1);
console.log('now framework name is ' + randomName + 'Env');

// 创建vm实例
const vm = new VM();

// 读取配置文件
var configCode = require(`${__dirname}/tools/tools.node.js`).getCode();
var windowCode = require(`${__dirname}/browser/rayEnv.node.js`).getCode();

// 获取目标代码
const targetCode = fs.readFileSync(`${__dirname}/target/ouyeel.js`, 'utf-8') + "\r\n";
const code = configCode + windowCode + targetCode;

// 更改变量名称
const modifiedCode = code.replace(/rayEnv/g, randomName + "Env");

// 执行配置文件
var script = new VMScript(modifiedCode, "debug.js");
fs.writeFileSync(`${__dirname}/debug.js`, script.code);
try {
    vm.run(script);
} catch (err) {
    console.error('Environment Error:', err.stack);
}