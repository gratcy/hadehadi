var exports = module.exports = {};

exports.get_users = function(username,pass) {
    var deferred = q.defer();
	sql.connect(dbConf).then(pool => {
		return pool.request().query("SELECT email,username,pass,fullname,create_date,access_date FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"'")
	}).then(result => {
		deferred.resolve(result);
	}).catch(err => {
		deferred.reject(err);
	})
    return deferred.promise;
};

