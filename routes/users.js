import models_users from '../models/models_users';

exports.get_users = async function(req, res) {
	var input = req.body;
	var username = helpers.decryptAES(input.username);
	var pass = helpers.decryptAES(input.pass);
	var macaddr = helpers.decryptAES(input.macaddr);
	
	try {
		if (!username || !pass || !macaddr) {
			res.send({error: {status: -1}, message: 'Input incomplete!'});
		}
		else {
			if (sql.connect) sql.close();
			var rows = await models_users.get_users(username,pass,macaddr);
			var data = rows.recordsets[0];
			sql.close();
			if (data.length > 0)
				import models_users from '../models/models_users';

exports.get_users = async function(req, res) {
	var input = req.body;
	var username = helpers.decryptAES(input.username);
	var pass = helpers.decryptAES(input.pass);
	var macaddr = helpers.decryptAES(input.macaddr);
	
	try {
		if (!username || !pass || !macaddr) {
			res.send({error: {status: -1}, message: 'Input incomplete!'});
		} else {
			if (sql.connect) sql.close();
			var rows = await models_users.get_users(username,pass);
			
			var data = rows.recordsets[0];
			
			sql.close();
			if (data.length > 0)
				var request = new sql.Request();
				request.query("insert into users (macaddr) values ('"+macaddr+"') where  (username,pass) values('"+username+"','"+pass+"')", function (err2, result2) {
					if (err2) {
						res.send({error: {status: -1}, message: 'Failed insert log data!',err2});
					}
					else {
						console.log('Success insert log data!');
						res.send({error: {status: 1}, message: 'Success insert log data!'});
					}
				});

				res.send({error: {status: 1}, users: rows.recordsets[0]});
			else
				res.send({error: {status: -1}, message: 'Username and password not match !'});
		}
	}
	catch (error){
		console.log(error);
	}
};

				res.send({error: {status: 1}, users: rows.recordsets[0]});
			else
				res.send({error: {status: -1}, message: 'Username and password not match !'});
		}
	}
	catch (error){
		console.log(error);
	}
};
