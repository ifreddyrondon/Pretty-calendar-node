$(document).ready(function(){
	routie({
		'': function(){
			ajaxNormal("/");
		},
		'registrar': function(){
			ajaxNormal("/registrar");
		},
	});
});