$(document).ready(function(){
	routie({
		'': function(){
			ajaxNormal("/user",null,null,"user_container");
		},
	});
});