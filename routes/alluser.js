var BD = require('../BD')
	,	sanitize = require('validator').sanitize
	, check = require('validator').check
	, crypto = require('crypto');

exports.registrar = function(req, res){
	res.render('registrar');
}
exports.disponibilidadEmail = function(req, res){
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
exports.disponibilidadCi = function(req, res){
	objBD = BD.BD();
	objBD.connect();
	try {
		check(req.body.cedula).notNull().len(7, 10);
		ci = sanitize(req.body.cedula).trim(); 	
		ci = sanitize(ci).xss();
		ci = sanitize(ci).entityDecode();
		objBD.query("SELECT cedula FROM persona WHERE cedula = "+ objBD.escape(ci) +"", 
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
	objBD = BD.BD();
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
exports.login = function(req, res){
	res.render('login');
}
exports.loginSend = function(req, res){
	objBD = BD.BD();
	objBD.connect();
	try {
	  check(req.body.login_user).notNull().len(6, 64).isEmail();
	  check(req.body.login_pass).notNull();
		
		login_user = sanitize(req.body.login_user).trim(); 	
		login_user = sanitize(login_user).xss();
		login_user = sanitize(login_user).entityDecode();
				
		pass = sanitize(req.body.login_pass).trim(); 	
		pass = sanitize(pass).xss();
		pass = sanitize(pass).entityDecode();
		
		pass= crypto.createHash('sha256').update(pass).digest("hex");
		pass= pass.substr(0,1)+"u"+pass.substr(2,pass.length/2)+"se"+pass.substr(pass.length/2)+"r";
		
		objBD.query("SELECT id_persona, nombre, tipo FROM persona WHERE email = "+ objBD.escape(login_user) +" AND password = "+ objBD.escape(pass) +"",
		function(err, rows, fields) {
	    if (err){
				objBD.end();
				res.send('1'); 
			}							
	    else {
		    if (rows.length == 1){
					var user = {
	        	id: rows[0]['id_persona'],
	        	nombre: rows[0]['nombre'],
	        	tipo: rows[0]['tipo'],
	        };
	        req.session.regenerate(function(){
			      req.session.user = user;
			      res.render('layout', { sesion: req.session.user });
		      });
		      objBD.end();
				}
				else
					res.send('1');
			}  
		});							
	} catch (e) {
	  res.send('1'); 
	  console.log(e.message);
	}
}