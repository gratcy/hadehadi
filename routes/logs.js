import models_logs from '../models/models_logs';

exports.logs = async function(req, res) {
	var input = req.body;
	var create_date = helpers.decryptAES(input.create_date);
	var issued_by = helpers.decryptAES(input.issued_by);
	
	var access_log = helpers.decryptAES(input.access_log);
	var send_log = helpers.decryptAES(input.send_log);
	var status_log = helpers.decryptAES(input.status_log);
	var reason_log = helpers.decryptAES(input.reason_log);
	console.log("+create_date+" + '\nAccess '+ access_log);
	
		
	try {
		if (issued_by) {
			if (sql.connect) sql.close();
			
			sql.connect(dbConf, function (err) {
				var request = new sql.Request();
				request.query("insert into log_data (create_date, issued_by, access_log, send_log, status_log,reason_log) values ('"+create_date+"','"+issued_by+"','"+access_log+"','"+send_log+"','"+status_log+"','"+reason_log+"')", function (err2, result2) {
					if (err2) {
						res.send({error: {status: -1}, message: 'Failed insert log data!',err2});
					}
					else {
						console.log('Success insert log data!');
						res.send({error: {status: 1}, message: 'Success insert log data!'});
					}
				});
			});
			
			sql.on('error', err => {
				console.log(err);
			})
		}
		else {
			console.log('Failed insert data!');
			res.send({error: {status: -1}, message: 'Failed insert log data!'});
		}
	}
	catch (error){
		console.log(error);
	}	
};
