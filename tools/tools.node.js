// tools/tools.node.js
// Node 端辅助工具：文件读取与拼接

const fs = require('fs');

function getCode() {
    const configCode = fs.readFileSync(`${__dirname}/config.js`, 'utf-8');
    const printCode = fs.readFileSync(`${__dirname}/print.js`, 'utf-8');
    const proxyCode = fs.readFileSync(`${__dirname}/proxy.js`, 'utf-8');
    const safetyCode = fs.readFileSync(`${__dirname}/safety.js`, 'utf-8');

    return configCode + "\r\n" + printCode + "\r\n" + proxyCode + "\r\n" + safetyCode;
}


module.exports = {
    getCode
};
