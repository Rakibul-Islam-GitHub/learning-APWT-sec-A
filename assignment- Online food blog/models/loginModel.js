const db = require('./db');

module.exports= {
	validate: function(user, callback){
		//var sql = `select * from user where username="${user.username}" and password="${user.password}"`;
		let sql= 'select * from users where username="'+user.username+'" and password="'+user.password+'" ';
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = 'select * from users where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from users";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getRole: function(user, callback){
		var sql = 'select role from users where username = "'+user.username+'"and password= "'+user.password+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){

		let sql= 'insert into users (username, password, role) values ("'+user.username+'", "'+user.password+'", "user")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});

	}
}