$(document).ready(function(){
	routie({
		'': function(){
			ajaxNormal("/user",null,null,"user_container");
		},
		'new_event': function(){
			ajaxNormal("/newEvent",null,null,"user_container");
		},
		'events/:fecha': function(fecha){
			ajaxNormal("/getEvents","date="+fecha,null,"user_container");
		},
	});
});