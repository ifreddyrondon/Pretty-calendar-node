
exports.index = function(req, res){
	if (req.session.user){
		function spanishDate(d){
			var weekday=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
			var monthname=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
			return weekday[d.getDay()]+", "+d.getDate()+" de "+monthname[d.getMonth()];
		}
		d = new Date();
		hoy={
			dia 			: d.getDate(),
			completa	: spanishDate(d),
			ano				: d.getFullYear(),
		}
		res.render('user/user',{eventos : "evento"});
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
		console.log(req.body.date);
	}
}
exports.newEvent = function(req, res){
	if (req.session.user){
		res.render('user/new_event');
	}
}