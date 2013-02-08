exports.login = function(req, res){
	res.render('login');
}
exports.registrar = function(req, res){
	res.render('registrar');
}
exports.disponibilidad = function(req, res){
	console.log(req.body.email);
	res.send(0);
}