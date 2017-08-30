var crypto = require('crypto');
var cryptoLib = require('cryptlib');
var encryptionKey = 'kopikoP1!';
var iv = "1234123412341234";

var getDateNow = function() {
	return Math.floor(Date.now() / 1000);
}

var generateHash = function(hash) {
	var shasum = crypto.createHash('sha1');
	shasum.update(''+hash+'');
	return shasum.digest('hex');
}

var encryptAES = function (plainText){
	var shaKey = cryptoLib.getHashSha256(encryptionKey, 32);
	return cryptoLib.encrypt(plainText, shaKey, iv);
}

var decryptAES = function (encryptedString){
	var shaKey = cryptoLib.getHashSha256(encryptionKey, 32);
	return cryptoLib.decrypt(encryptedString, shaKey, iv);
}

module.exports = {
	getDateNow: getDateNow,
	generateHash: generateHash,
	decryptAES: decryptAES,
	encryptAES: encryptAES,
}
