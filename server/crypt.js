const { AES, enc } = require('crypto-js');

const salt = "CHANGE_THAT";

module.exports.crypt = (data) => {
    return AES.encrypt(data, salt).toString();
}

module.exports.decrypt = (data) => {
    return AES.decrypt(data, salt).toString(enc.Utf8);
}