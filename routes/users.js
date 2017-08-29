import models_users from '../models/models_users';

exports.get_users = async function(req, res) {
	var input = req.body;
	if (!input.username || !input.pass) {
		res.send({error: {status: -1}, message: 'Input incomplete!'});
	}
	else {
		let users = await models_users.get_users(input.username,input.pass);
		sql.close();
		if (users.recordsets) {
			res.send({error: {status: 1}, users: users.recordsets[0]});
		}
		else {
			res.send({error: {status: -1}, message: 'Invalid username and password!'});
		}
	}
};
