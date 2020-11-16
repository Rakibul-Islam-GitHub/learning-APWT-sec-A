const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = 'select * from restaurants where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from restaurants";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		

	},
	update:function(user, callback){

		

	},

	search: function(content, callback){
		var sql = 'SELECT name from restaurants where name like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){
		let sql= 'delete from restaurants where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}