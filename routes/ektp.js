var sql = require('mssql');

exports.ektp = async function(req, res) {
	var input = req.body;
	console.log(input);
	var create_date = helpers.decryptAES(input.create_date);
	var issued_by = helpers.decryptAES(input.issued_by);
	var nik = helpers.decryptAES(input.nik);
	var nama = helpers.decryptAES(input.nama);
	var tmp_lahir = helpers.decryptAES(input.tmp_lahir);
	var tgl_lahir = helpers.decryptAES(input.tgl_lahir);
	var jns_kelamin = helpers.decryptAES(input.jns_kelamin);
	var gol_darah = helpers.decryptAES(input.gol_darah);
	var alamat = helpers.decryptAES(input.alamat);
	var rt = helpers.decryptAES(input.rt);
	var rw = helpers.decryptAES(input.rw);
	var kel = helpers.decryptAES(input.kel);
	var kec = helpers.decryptAES(input.kec);
	var kab = helpers.decryptAES(input.kab);
	var prov = helpers.decryptAES(input.prov);
	var agama = helpers.decryptAES(input.agama);
	var status = helpers.decryptAES(input.status);
	var pekerjaan = helpers.decryptAES(input.pekerjaan);
	var kewarganegaraan = helpers.decryptAES(input.kewarganegaraan);
	var masa_berlaku = helpers.decryptAES(input.masa_berlaku);
	var biometric = helpers.decryptAES(input.biometric);
	var foto = helpers.decryptAES(input.foto);
	var ttd = helpers.decryptAES(input.ttd);
	
	if (nik) {
		sql.connect(dbConf, function (err) {
			var request = new sql.Request();
			request.query("SELECT * FROM ektp WHERE nik='"+nik+"'", function (err, result) {
				if (err) {
					sql.close();
					res.send({error: {status: -1}, message: 'NIK exists!',err});
				}
				else {
					if (result.rowsAffected > 0) {
						sql.close();
						res.send({error: {status: -1}, message: 'EKTP exists!'});
					}
					else {
						request.query("insert into ektp (create_date,issued_by,nik,nama,tmp_lahir,tgl_lahir,jns_kelamin,gol_darah,alamat,rt,rw,kel,kec,kab,prov,agama,status,pekerjaan,kewarganegaraan,masa_berlaku,biometric,foto,ttd) values ('"+create_date+"','"+issued_by+"','"+nik+"','"+nama+"','"+tmp_lahir+"','"+tgl_lahir+"','"+jns_kelamin+"','"+gol_darah+"','"+alamat+"','"+rt+"','"+rw+"','"+kel+"','"+kec+"','"+kab+"','"+prov+"','"+agama+"','"+status+"','"+pekerjaan+"','"+kewarganegaraan+"','"+masa_berlaku+"','"+biometric+"','"+foto+"','"+ttd+"')", function (err2, result2) {
							if (err2) {
								sql.close();
								res.send({error: {status: -1}, message: 'Failed insert data!',err});
							}
							else {
								sql.close();
								res.send({error: {status: 1}, message: 'Success insert data!'});
							}
						});
					}
				}
			});
		});
	}
	else {
		res.send({error: {status: -1}, message: 'Failed insert data!'});
	}
};
