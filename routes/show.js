import models_ektp from '../models/models_ektp';

exports.view_data = async function(req, res) {
	try {
		if (sql.connect) sql.close();
		var rows = await models_ektp.get_ektp();
		//~ console.log(rows);
		res.render('data',{data:rows.recordset});
	}
	catch (error){
		console.log(error);
	}
};
