$(document).ready(function(){
	routie({
		'': function(){
			ajaxNormal("/",null,null,"wrapper");
		},
		'registrar': function(){
			ajaxNormal("/registrar",null,null,"wrapper");
		},
	});
});