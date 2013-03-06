
exports.spanishDate = function(d) {  
	var weekday=["domingo","lunes","martes","miercoles","jueves","viernes","sabado"];
	var monthname=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
	return weekday[d.getDay()]+", "+d.getDate()+" de "+monthname[d.getMonth()]+" del "+d.getFullYear();	
}