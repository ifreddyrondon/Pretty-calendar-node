
/*
 * GET home page.
 */

exports.index = function(req, res){
  console.log(req.session.user);
  res.render('layout', { sesion: req.session.user });
};