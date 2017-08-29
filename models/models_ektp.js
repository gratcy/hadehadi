var exports = module.exports = {};

exports.check_ektp = function(nik) {
    var deferred = q.defer();
	sql.connect(dbConf).then(pool => {
		return pool.request().query("SELECT * FROM ektp WHERE nik='"+nik+"'")
	}).then(result => {
		deferred.resolve(result);
	}).catch(err => {
		deferred.reject(err);
	})
    return deferred.promise;
};

exports.get_ektp = function() {
    var deferred = q.defer();
	sql.connect(dbConf).then(pool => {
		return pool.request().query("SELECT * FROM ektp")
	}).then(result => {
		deferred.resolve(result);
	}).catch(err => {
		deferred.reject(err);
	})
    return deferred.promise;
};

