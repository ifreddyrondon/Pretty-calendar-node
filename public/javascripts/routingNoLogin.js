$(document).ready(function(){
	routie({
		'registrar': function(){
			ajaxNormal("/registrar");
		},
	});
});