// index.js
// 导包
const fs = require('fs');
const { VM, VMScript } = require('vm2');

// 创建vm实例
const vm = new VM();

// 读取配置文件
var configCode = require(`${__dirname}/tools/tools.node.js`).getCode();

// 执行配置文件
var script = new VMScript(configCode, "debug.js");
fs.writeFileSync(`${__dirname}/debug.js`, script.code);
vm.run(script);