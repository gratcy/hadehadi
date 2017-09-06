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
	if (encryptedString) {
		var shaKey = cryptoLib.getHashSha256(encryptionKey, 32);
		return cryptoLib.decrypt(encryptedString, shaKey, iv);
		//~ return encryptedString;
	}
	else {
		return '';
	}
}

var convertTime = function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

module.exports = {
	getDateNow: getDateNow,
	generateHash: generateHash,
	decryptAES: decryptAES,
	encryptAES: encryptAES,
	convertTime: convertTime,
}
