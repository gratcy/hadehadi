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
				res.send({error: {status: 1}, users: rows.recordsets[0]});
			else
				res.send({error: {status: -1}, message: 'Username and password not match !'});
		}
	}
	catch (error){
		console.log(error);
	}
};
