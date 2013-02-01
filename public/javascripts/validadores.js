$(document).ready(function(){
//Ppal Validados-------------------------------------------------------
	function validator(funciones,id,min){
		if (validar(funciones,id,min)){
			document.getElementById(id).style.backgroundImage="url('images/check.png')";
	  	document.getElementById(id).style.backgroundRepeat="no-repeat";
	  	document.getElementById(id).style.backgroundPosition="right center";
	  	return true;
		}
		else{
			document.getElementById(id).style.backgroundImage="url('images/false.png')";
	  	document.getElementById(id).style.backgroundRepeat="no-repeat";
	  	document.getElementById(id).style.backgroundPosition="right center";
	  	return false;
		}
	}
	function validar(funciones,id,min){
		empty = true;
		number = true;
		formatoImagen = true;
	  correo = true;
	  minimo = true;
		funciones = funciones.split(',');
		for(i=0;i<funciones.length;i++){
			if(funciones[i]=='empty')
				empty = IsEmpty(document.getElementById(id));
			if(funciones[i]=='number')
				number = IsNumeric(document.getElementById(id));
			if(funciones[i]=='formatImage')
				number = formatImage(document.getElementById(id));
			if(funciones[i]=='CorreoAvailability')
				correo = CorreoAvailability(document.getElementById(id));		
			if(funciones[i]=='min')
				minimo = minChar(document.getElementById(id),min);		
		}
		return empty && number && formatoImagen && correo && minimo;	
	}
  window.validator=validator;
//Funciones-validadoras--------------------------------------------------------------------
	function IsEmpty(el){
	  if(el.value == '')
	  	return false;
	  else if(el.value != '')
		  return true;
  }
  function IsNumeric(el){
	  RE = /^-{0,1}\d*\.{0,1}\d+$/;
	  return RE.test(el.value);
  }
  function formatImage(el){
	  ext = el.value.split('.').pop().toLowerCase(); 	
		if (! (ext && /^(jpg|png|jpeg|gif)$/.test(ext)))
			return false;
		else
			return true;  
  }
  function minChar(el,min){
	  if(el.value.length < min)
	  	return false;
	  else 
		  return true;
  }
  function validaCorreo(valor) {
		var expresion = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
		return expresion.test(valor);
	}
	function CorreoAvailability(el){
		if(validaCorreo(el.value)){
			correo_data = 'correo_data='+ el.value;
			$.ajax({
				type: "POST",
				url: "/disponibilidad",
				data: correo_data,
				async: false,
				beforeSend: function(){
				  //$("#btn_update_enviar").attr("disabled", true);
				  el.style.backgroundImage="url('images/loader.gif')";
				  el.style.backgroundRepeat="no-repeat";
				  el.style.backgroundPosition="right center";
				},
				success: function( respuesta_correo ){
					//$("#btn_update_enviar").attr("disabled", false);
					if(respuesta_correo == '1')
						resCorreo = false; 
					else if(respuesta_correo == '0')
						resCorreo = true;
				}
			});
			return resCorreo;
		}
		else 
			return false;	
	}
//----AJAX----------------------------------------------------------------------------------
	function ajaxNormal(url,datos,reload){
		$.ajax({
	  	type: 'POST',
			url: url,
			data: datos,
	    beforeSend: function(){
			 	$("#bowlG").show();
			},
	    success: function(res){
	    	$("#bowlG").hide();
	    	if (res == '1')
	      	alert("error");
	    	else {
		    	if(reload)	window.location = res;
		    	else	$("#wrapper").html(res);
	    	}
			}
		});
	}
	function ajaxDatos(url,id){
		$(document.getElementById(id)).ajaxForm({
	  	type: 'POST',
			url: url,
	    beforeSend: function(){
			 	$("#bowlG").show();
			},
	    success: function(res){
	    	$("#bowlG").hide();
	    	if (res == '1')
	      	alert("error");
	    	else 
	        $("#wrapper").html(res);
			}
		});
	}
	function ajaxDatosReload(url,id){
		$(document.getElementById(id)).ajaxForm({
	  	type: 'POST',
			url: url,
	    beforeSend: function(){
			 	$("#bowlG").show();
			},
	    success: function(res){
	    	$("#bowlG").hide();
	    	if (res == '1')
	      	alert("error");
	    	else 
	        window.location = res;
			}
		});
	}
	window.ajaxNormal=ajaxNormal;	
	window.ajaxDatos=ajaxDatos;	
	window.ajaxDatosReload=ajaxDatosReload;	
});