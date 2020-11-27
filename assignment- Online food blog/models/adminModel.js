const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = 'select * from admin where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from admin";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	delete: function(id, callback){
		let sql= 'delete from foodexp where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	
	deleteexpComment: function(id, callback){
		let sql= 'delete from foodexpcomment where postid= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	
}