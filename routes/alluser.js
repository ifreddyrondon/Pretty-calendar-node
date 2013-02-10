var BD = require('../BD')
	,	sanitize = require('validator').sanitize
	, check = require('validator').check
	, crypto = require('crypto');

exports.login = function(req, res){
	res.render('login');
}
exports.registrar = function(req, res){
	res.render('registrar');
}
exports.disponibilidad = function(req, res){
	objBD = BD.BD();
	objBD.connect();
	try {
		check(req.body.email).notNull().len(6, 64).isEmail();
		email = sanitize(req.body.email).trim(); 	
		email = sanitize(email).xss();
		email = sanitize(email).entityDecode();
		objBD.query("SELECT email FROM persona WHERE email = "+ objBD.escape(email) +"", 
		function(err, rows, fields) {
	    if (err){
				objBD.end();
				res.send('1'); 
			}
	    else {
		    if (rows.length > 0){
					objBD.end();
					res.send('1'); 
				}
		    else{
			  	res.send('0'); 
			  	objBD.end();
		    }	
	    }
	  });
	} catch (e) {
	  res.send('1'); 
	  console.log(e.message);
	}
}
exports.registrarSend = function(req, res){
	objBD.connect();
	try {
    check(req.body.registrar_nombre).notNull();
	  check(req.body.registrar_email).notNull().len(6, 64).isEmail();
	  check(req.body.registrar_cedula).notNull().len(7, 10);
	  check(req.body.registrar_pass).notNull();
	  
		registrar_nombre = sanitize(req.body.registrar_nombre).trim(); 	
		registrar_nombre = sanitize(registrar_nombre).xss();
		registrar_nombre = sanitize(registrar_nombre).entityDecode();
		
		registrar_email = sanitize(req.body.registrar_email).trim(); 	
		registrar_email = sanitize(registrar_email).xss();
		registrar_email = sanitize(registrar_email).entityDecode();
		
		registrar_cedula = sanitize(req.body.registrar_cedula).trim(); 	
		registrar_cedula = sanitize(registrar_cedula).xss();
		registrar_cedula = sanitize(registrar_cedula).entityDecode();
		
		pass = sanitize(req.body.registrar_pass).trim(); 	
		pass = sanitize(pass).xss();
		pass = sanitize(pass).entityDecode();
		
		pass= crypto.createHash('sha256').update(pass).digest("hex");
		pass= pass.substr(0,1)+"u"+pass.substr(2,pass.length/2)+"se"+pass.substr(pass.length/2)+"r";
		
		objBD.query("INSERT INTO persona(email,nombre,cedula,password) VALUES ("+objBD.escape(registrar_email)+","+objBD.escape(registrar_nombre)+","+objBD.escape(registrar_cedula)+","+objBD.escape(pass)+")", 
  	function(err, result){
			if (err){
				objBD.end();
				res.send('1'); 
			}
		  else {
			  objBD.end();
			  //res.send('0'); 
			  console.log("REGISTRADO");
		  }
		});
		
	} catch (e) {
	  res.send('1'); 
	  console.log(e.message);
	}
}