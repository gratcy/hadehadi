import models_logs from '../models/models_logs';

exports.view_logs = async function(req, res) {
	try {
		if (sql.connect) sql.close();
		var rows = await models_logs.get_log();
		var rdata = rows.recordset;
		var logdata= [];
		
		for(var i=0;i<rows.rowsAffected;++i) {
			rdata[i].created_date= helpers.convertTime(rdata[i].created_date);
			rdata[i].access_log = helpers.convertTime(rdata[i].access_log);
			rdata[i].send_log = helpers.convertTime(rdata[i].send_log);		
			logdata.push(rdata[i]);
		}
		
		res.render('logdata',{logdata:logdata});
	}
	catch (error){
		console.log(error);
	}
};