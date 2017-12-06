var exports = module.exports = {};

exports.get_users = function(username,pass) {
    var deferred = q.defer();
	var pool = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT * FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"' AND pass='"+macaddr+"'", function (err, result) {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(result);
			}
		});
	});
	sql.on('error', err => {
		console.log(err);
	})
    return deferred.promise;
};
