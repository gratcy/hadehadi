import models_users from '../models/models_users';

exports.get_users = async function(req, res) {
	var input = req.body;
	var username = helpers.decryptAES(input.username);
	var pass = helpers.decryptAES(input.pass);
	
	try {
		if (!username || !pass) {
			res.send({error: {status: -1}, message: 'Input incomplete!'});
		}
		else {
			if (sql.connect) sql.close();
			var rows = await models_users.get_users(username,pass);
			var data = rows.recordsets[0];
			if (data.length > 0)
				res.send({error: {status: 1}, users: rows.recordsets[0]});
			else
				res.send({error: {status: -1}, message: 'Username and password not match !'});
		}
	}
	catch (error){
		console.log(error);
	}
};