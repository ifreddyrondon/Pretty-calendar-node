$(document).ready(function(){

//Registrar
$(document).on("blur","#registrar_nombre",function(){validator("empty",$(this).attr('id'))});

});