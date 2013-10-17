var mysql = require('mysql')

exports.BD = function() {  
		var connection = mysql.createConnection({
		socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock',
		user : 'root',
		password : 'yourpassword',
		database : 'spantons_dr',
		});
	return connection;
}