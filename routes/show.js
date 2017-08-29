import models_ektp from '../models/models_ektp';

exports.view_data = async function(req, res) {
	let ektp = await models_ektp.get_ektp();
	sql.close();
	res.render('data',{data:ektp.recordset});
};
