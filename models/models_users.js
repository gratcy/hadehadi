var exports = module.exports = {};

exports.get_users = function(username,pass,macaddr) {
    var deferred = q.defer();
	var pool = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT * FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"'", function (err, result) {
			if (err) {
				deferred.reject(err);
			}else {
				deferred.resolve(result);
				var request = new sql.Request();
				request.query("UPDATE [users] SET macaddr = '"+macaddr+"' WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"", function (err, result) {
					if (err) {
						deferred.reject(err);
					}else {
						deferred.resolve(result);
					}
				});

			}
		});
	});
	sql.on('error', err => {
		console.log(err);
	})
    return deferred.promise;
};


exports.update_users = function(username,pass,macaddr) {
    var deferred = q.defer();
	var pool = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("UPDATE [users] SET macaddr = '"+macaddr+"' WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"", function (err, result) {
			if (err) {
				deferred.reject(err);
			}else {
				deferred.resolve(result);
			}
		});
	});
	sql.on('error', err => {
		console.log(err);
	})
    return deferred.promise;
};