var exports = module.exports = {};

exports.get_users = function(username,pass) {
    var deferred = q.defer();
	//~ sql.connect(dbConf).then(pool => {
		//~ return pool.request().query("SELECT email,username,pass,fullname,create_date,access_date FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"'")
	//~ }).then(result => {
		//~ sql.close();
		//~ deferred.resolve(result);
	//~ }).catch(err => {
		//~ sql.close();
		//~ deferred.reject(err);
	//~ })

	var conn = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT email,username,pass,fullname,create_date,access_date FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"'", function (err, result) {
			if (err) {
				deferred.reject(err);
			}
			else {
				deferred.resolve(result);
			}
		});
	});
    return deferred.promise;
};

