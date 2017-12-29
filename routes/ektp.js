import models_ektp from '../models/models_ektp';
import models_users from '../models/models_users';

var moment = require('moment');

exports.ektp = async function(req, res) {
	var input 			= req.body;
	var created_date 	= helpers.decryptAES(input.created_date);
	var save_date 		= moment().valueOf();
	var created_by 		= helpers.decryptAES(input.created_by);
	var status			= helpers.decryptAES(input.status);
	var ektp_status		= helpers.decryptAES(input.ektp_status);
	var nik 			= helpers.decryptAES(input.nik);
	var nama_lkp 		= helpers.decryptAES(input.nama_lkp);
	var tmpt_lhr 		= helpers.decryptAES(input.tmpt_lhr);
	var tgl_lhr 		= helpers.decryptAES(input.tgl_lhr);
	var jenis_klmin 	= helpers.decryptAES(input.jenis_klmin);
	var gol_darah 		= helpers.decryptAES(input.gol_darah);
	var alamat 			= helpers.decryptAES(input.alamat);
	var no_rt 			= helpers.decryptAES(input.no_rt);
	var no_rw 			= helpers.decryptAES(input.no_rw);
	var kel_name 		= helpers.decryptAES(input.kel_name);
	var kec_name 		= helpers.decryptAES(input.kec_name);
	var kab_name 		= helpers.decryptAES(input.kab_name);
	var prop_name 		= helpers.decryptAES(input.prop_name);
	var agama 			= helpers.decryptAES(input.agama);
	var status_kawin 	= helpers.decryptAES(input.status_kawin);
	var jenis_pkrjn 	= helpers.decryptAES(input.jenis_pkrjn);
	var kewarganegaraan = helpers.decryptAES(input.kewarganegaraan);
	var masa_berlaku 	= helpers.decryptAES(input.masa_berlaku);
	var biometric 		= helpers.decryptAES(input.biometric);
	var foto 			= helpers.decryptAES(input.foto);
	var ttd 			= helpers.decryptAES(input.ttd);
	var status_send 	= helpers.decryptAES(input.status_send);

	

	try {
		if (nik) {
			if (sql.connect) sql.close();
			let rcreatedby = await models_users.get_user_detail(created_by);
			let username = rcreatedby.recordset[0].username || '';

			sql.close()

			sql.connect(dbConf, function (err) {
				var request = new sql.Request();
				request.query("insert into ektp (log_id, created_date,save_date,created_by,status,ektp_status,nik,nama_lkp,tmpt_lhr,tgl_lhr,jenis_klmin,gol_darah,alamat,no_rt,no_rw,kel_name,kec_name,kab_name,prop_name,agama,status_kawin,jenis_pkrjn,kewarganegaraan,masa_berlaku,biometric,foto,ttd,status_send,updated_by,updated_date) values ((SELECT TOP 1 id FROM log_data  WHERE created_by = '"+created_by+"' ORDER  BY id DESC),'"+created_date+"','"+save_date+"','"+username+"','"+status+"','"+ektp_status+"','"+nik+"','"+nama_lkp+"','"+tmpt_lhr+"','"+tgl_lhr+"','"+jenis_klmin+"','"+gol_darah+"','"+alamat+"','"+no_rt+"','"+no_rw+"','"+kel_name+"','"+kec_name+"','"+kab_name+"','"+prop_name+"','"+agama+"','"+status_kawin+"','"+jenis_pkrjn+"','"+kewarganegaraan+"','"+masa_berlaku+"','"+biometric+"','"+foto+"','"+ttd+"','"+status_send+"','"+username+"','"+save_date+"')", function (err2, result2) {
					if (err2) {
						res.send({error: {status: 0}, message: 'Failed insert data!',err2});
					}
					else {
						console.log('Success insert data!');
						res.send({error: {status: 1}, message: 'Success insert data!'});
					}
				});
			});
			
			sql.on('error', err => {
				console.log(err);
			})
		}
		else {
			console.log('Failed insert data!');
			res.send({error: {status: 0}, message: 'Failed insert data!'});
		}
	}
	catch (error){
		console.log(error);
	}	
};
