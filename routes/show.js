import models_ektp from '../models/models_ektp';

exports.view_data = async function(req, res) {
	try {
		if (sql.connect) sql.close();
		var rows = await models_ektp.get_ektp();
		var rdata = rows.recordset;
		var data = [];
		
		for(var i=0;i<rows.rowsAffected;++i) {
			rdata[i].create_date = helpers.convertTime(rdata[i].create_date);
			data.push(rdata[i]);
		}
		
		res.render('data',{data:data});
	}
	catch (error){
		console.log(error);
	}
};