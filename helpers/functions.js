var crypto = require('crypto');
	var algorithm = 'aes-128-cbc',
		password = 'kopikoP1!',
		encryptionKey = 'kopikoP1!';


var getDateNow = function() {
	return Math.floor(Date.now() / 1000);
}

var generateHash = function(hash) {
	var shasum = crypto.createHash('sha1');
	shasum.update(''+hash+'');
	return shasum.digest('hex');
}

var encryptAES = function (text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

var decryptAES2 = function (encryptdata){
    encryptdata = new Buffer(encryptdata, 'base64').toString('binary');
	const decipher = crypto.createDecipher(algorithm, encryptionKey);
    decipher.setAutoPadding(false);
    var decoded  = decipher.update(encryptdata);

    decoded += decipher.final("utf8");
    return decoded;
}

var decryptAES = function (encryptdata){
	var decipher = crypto.createDecipher(algorithm, encryptionKey);

	var chunks = []
	chunks.push( decipher.update( new Buffer(encryptdata, "base64").toString("binary")) );
	chunks.push( decipher.final('binary') );
	console.log(chunks);
	var txt = chunks.join("");
	txt = new Buffer(txt, "binary").toString("utf-8");
	return txt;
}

module.exports = {
	getDateNow: getDateNow,
	generateHash: generateHash,
	decryptAES: decryptAES,
	decryptAES2: decryptAES2,
	encryptAES: encryptAES,
}
