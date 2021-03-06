var exports = module.exports = {};
var sql = require('mssql');

exports.check_ektp = function(nik) {
    var deferred = q.defer();
	var pool = sql.connect(dbConf, function (err) {
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
	var pool = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT a.*,b.fullname FROM ektp a LEFT JOIN users b ON a.created_by=b.uid ORDER BY a.id DESC", function (err, result) {
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
