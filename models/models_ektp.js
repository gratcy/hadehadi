var exports = module.exports = {};

exports.check_ektp = function(nik) {
    var deferred = q.defer();
	sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT * FROM ektp WHERE nik='"+nik+"'", function (err, result) {
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

exports.get_ektp = function() {
    var deferred = q.defer();
	sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT * FROM ektp", function (err, result) {
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

