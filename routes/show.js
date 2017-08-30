var sql = require('mssql');

exports.view_data = function(req, res) {
	sql.connect(dbConf, function (err) {
		var request = new sql.Request();
		request.query("SELECT * FROM ektp", function (err, result) {
			sql.close();
			if (err) {
				res.render('data',{data:{}});
			}
			else {
				res.render('data',{data:result.recordset});
			}
		});
	});
};
