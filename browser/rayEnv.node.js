// 导包
const fs = require('fs');

function getCode() {
    const windowCode = fs.readFileSync(`${__dirname}/Window.js`, 'utf-8') + "\r\n";
    const documentCode = fs.readFileSync(`${__dirname}/Document.js`, 'utf-8') + "\r\n";
    const locationCode = fs.readFileSync(`${__dirname}/Location.js`, 'utf-8') + "\r\n";
    const storageCode = fs.readFileSync(`${__dirname}/Storage.js`, 'utf-8') + "\r\n";
    return windowCode + documentCode + locationCode + storageCode;
}


module.exports = {
    getCode
};
