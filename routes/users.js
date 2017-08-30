var sql = require('mssql');

exports.get_users = function(req, res) {
	var input = req.body;
	var username = helpers.decryptAES(input.username);
	var pass = helpers.decryptAES(input.pass);
	
	
	try {
		if (!username || !pass) {
			res.send({error: {status: -1}, message: 'Input incomplete!'});
		}
		else {
			sql.connect(dbConf, function (err) {
				var request = new sql.Request();
				request.query("SELECT email,username,pass,fullname,create_date,access_date FROM users WHERE username='"+username+"' AND pass='"+helpers.generateHash(pass)+"'", function (err, result) {
					sql.close();
					if (err) {
						res.send({error: {status: -1}, message: 'Invalid username and password!'});
					}
					else {
						res.send({error: {status: 1}, users: result.recordsets[0]});
					}
				});
			});
		}
	}
	catch (error){
		console.log(error);
	}
};
