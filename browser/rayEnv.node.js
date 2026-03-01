// 导包
const fs = require('fs');

function getCode() {
    const windowCode = fs.readFileSync(`${__dirname}/Window.js`, 'utf-8') + "\r\n";

    return windowCode;
}


module.exports = {
    getCode
};
