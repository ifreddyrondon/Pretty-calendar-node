$(document).ready(function(){
//Login
$(document).on("focus","#login_user",function(){focusEmpty('login_user')});
$(document).on("blur","#login_user",function(){if(this.value =='') this.value='Correo/Email'});
$(document).on("focus","#login_pass_temp",function(){
	$('#login_pass_temp').hide();
	$('#login_pass').show();
	$("#login_pass").focus();
});
$(document).on("blur","#login_pass",function(){
	if(this.value ==''){
		$('#login_pass').hide();
		$('#login_pass_temp').show();	
	}
});
$(document).on("click","#login_enviar",function(){
	if($('#login_user').val()!='Correo/Email' && $('#login_pass_temp').css("display")=="none"){
		$('.error').hide();
	}
	else{
		$('.error_datos').show();
		return false;
	}
});

//Registrar
$(document).on("blur","#registrar_nombre",function(){validator("name","empty",$(this).attr('id'))});
$(document).on("blur","#registrar_email",function(){validator("correo","CorreoAvailability",$(this).attr('id'))});
$(document).on("blur","#registrar_cedula",function(){validator("ci","ci",$(this).attr('id'))});
$(document).on("blur","#registrar_pass",function(){validator("pass","empty,min",$(this).attr('id'),6)});
$(document).on("blur","#registrar_pass_repeat",function(){validator("pass","empty,min",$(this).attr('id'),6)});

});