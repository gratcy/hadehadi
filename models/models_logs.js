var exports = module.exports = {};
var sql = require('mssql');

exports.get_log = function() {
    var deferred = q.defer();
	var pool = sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT a.*,b.fullname FROM log_data a LEFT JOIN users b ON a.created_by=b.uid ORDER BY a.id DESC", function (err, result) {
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
