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
			var users = await models_users.get_users(username,pass);
			sql.close();
			if (users.recordsets) {
				res.send({error: {status: 1}, users: users.recordsets[0]});
			}
			else {
				res.send({error: {status: -1}, message: 'Invalid username and password!'});
			}
		}
	}
	catch (error){
		console.log(error);
	}
};
