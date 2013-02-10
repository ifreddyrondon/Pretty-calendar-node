
exports.logout = function(req, res){
	if (req.session.user){
		req.session.destroy(function(err){
	 	if (err)	res.send('A ocurrido un error, vuelva a intentarlo mas tarde');
	  else	res.redirect('/');
	  });
	}
}
