var BD = require('../BD')
	, fecha = require('./date')
	,	sanitize = require('validator').sanitize
	, check = require('validator').check;

exports.index = function(req, res){
	if (req.session.user){
		res.render('user/user',{eventos : null});
	}
}
exports.logout = function(req, res){
	if (req.session.user){
		req.session.destroy(function(err){
	 	if (err)	res.send('A ocurrido un error, vuelva a intentarlo mas tarde');
	  else	res.redirect('/');
	  });
	}
}
exports.getEvents = function(req, res){
	if (req.session.user){
		try {
		  check(req.body.date).notNull().isDate();
			
			date = sanitize(req.body.date).trim(); 	
			date = sanitize(date).xss();
			date = sanitize(date).entityDecode();
			
			//Comprobando la fecha en español
			d= new Date(date);
			console.log(fecha.spanishDate( d ));
			
			objBD = BD.BD();
			objBD.connect();
			objBD.query("SELECT nombre FROM evento WHERE fecha = "+ objBD.escape(new Date(date)) +"",
			function(err, rows, fields) {
		    if (err){
		    	console.log(err);
					objBD.end();
					res.send('1'); 
				}							
		    else {
			    if (rows.length > 0){
				    res.render('user/user',{eventos : rows });
						objBD.end();					
					}
					else{
						res.render('user/user',{eventos : null});	
						objBD.end();
					}
				}  
			});
		} catch (e) {
		  res.send('1'); 
		  console.log(e.message);
		}	
	}
}

