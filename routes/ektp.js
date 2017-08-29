import models_ektp from '../models/models_ektp';

exports.ektp = async function(req, res) {
	var input = req.body;
	
	var create_date = input.create_date;
	var issued_by = input.issued_by;
	var nik = input.nik;
	var nama = input.nama;
	var tmp_lahir = input.tmp_lahir;
	var tgl_lahir = input.tgl_lahir;
	var jns_kelamin = input.jns_kelamin;
	var gol_darah = input.gol_darah;
	var alamat = input.alamat;
	var rt = input.rt;
	var rw = input.rw;
	var kel = input.kel;
	var kec = input.kec;
	var kab = input.kab;
	var prov = input.prov;
	var agama = input.agama;
	var status = input.status;
	var pekerjaan = input.pekerjaan;
	var kewarganegaraan = input.kewarganegaraan;
	var masa_berlaku = input.masa_berlaku;
	var biometric = input.biometric;
	var foto = input.foto;
	var ttd = input.ttd;
	
	if (nik) {
		let checkNIK = await models_ektp.check_ektp(nik);
		sql.close();
		
		if (checkNIK.rowsAffected > 0) {
			res.send({error: {status: -1}, message: 'EKTP exists!'});
		}
		else {
			sql.connect(dbConf).then(pool => {
				return pool.request().query("insert into ektp (create_date,issued_by,nik,nama,tmp_lahir,tgl_lahir,jns_kelamin,gol_darah,alamat,rt,rw,kel,kec,kab,prov,agama,status,pekerjaan,kewarganegaraan,masa_berlaku,biometric,foto,ttd) values ('"+create_date+"','"+issued_by+"','"+nik+"','"+nama+"','"+tmp_lahir+"','"+tgl_lahir+"','"+jns_kelamin+"','"+gol_darah+"','"+alamat+"','"+rt+"','"+rw+"','"+kel+"','"+kec+"','"+kab+"','"+prov+"','"+agama+"','"+status+"','"+pekerjaan+"','"+kewarganegaraan+"','"+masa_berlaku+"','"+biometric+"','"+foto+"','"+ttd+"')")
			}).then(result => {
				sql.close();
				res.send({error: {status: 1}, message: 'Success insert data!'});
			}).catch(err => {
				sql.close();
				res.send({error: {status: -1}, message: 'Failed insert data!',err});
			});
		}
	}
	else {
		res.send({error: {status: -1}, message: 'Failed insert data!'});
	}
};
