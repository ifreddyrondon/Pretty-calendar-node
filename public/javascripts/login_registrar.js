$(document).ready(function(){
	//Login
	$(document).on("focus","#login_user",function(){focusEmpty('login_user')});
	$(document).on("blur","#login_user",function(){if(this.value =='') this.value='Correo/Email'; else validator("correo","IsCorreo",$(this).attr('id'))});
	$(document).on("focus","#login_pass_temp",function(){$('#login_pass_temp').hide();$('#login_pass').show();$("#login_pass").focus();});
	$(document).on("blur","#login_pass",function(){if(this.value ==''){$('#login_pass').hide();$('#login_pass_temp').show();}});
	$(document).on("click","#login_enviar",function(){
		if($('#login_user').val()!='Correo/Email' && $('#login_pass_temp').css("display")=="none" && validator("correo","IsCorreo","login_user")){
			$(document.getElementById("err_btn_login")).remove();
			$("#login_pass").val(CryptoJS.SHA512($('#login_pass').val()));
			ajaxDatos("/loginSend","form-login");
		}
		else{
			errorHandler('form-login');
			return false;
		}
	});
	//Registrar
	$(document).on("blur","#registrar_nombre",function(){validator("name","empty",$(this).attr('id'))});
	$(document).on("blur","#registrar_email",function(){validator("correo","CorreoAvailability",$(this).attr('id'))});
	$(document).on("blur","#registrar_cedula",function(){validator("ci","ci",$(this).attr('id'))});
	$(document).on("blur","#registrar_pass",function(){validator("pass","empty,min",$(this).attr('id'),6)});
	$(document).on("blur","#registrar_pass_repeat",function(){validator("pass","empty,min",$(this).attr('id'),6)});
	$(document).on("click","#registrar_enviar",function(){
		if(validator("name","empty","registrar_nombre") && validator("correo","CorreoAvailability","registrar_email") && validator("ci","ci","registrar_cedula") && validator("pass","empty,min","registrar_pass",6) && validator("pass","empty,min","registrar_pass_repeat",6)){
			if($("#registrar_pass").val() != $("#registrar_pass_repeat").val()){
				if(document.getElementById("pass_coincidencia") == null)
					$('.error').append('<div id="pass_coincidencia"><font size="5">* </font>Las 2 contraseñas no coinciden. ¿Quieres volver a intentarlo?</div>');
				return false;
			}
			else{
				$(document.getElementById("pass_coincidencia")).remove();
				$("#registrar_pass").val(CryptoJS.SHA512($('#registrar_pass').val()));
				ajaxDatos("/registrarSend","form-registrar");
			}
		}
		else	return false;
	});
});