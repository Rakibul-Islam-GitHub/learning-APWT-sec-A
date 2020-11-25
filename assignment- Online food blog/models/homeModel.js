const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = 'select * from restaurant where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = 'select * from restaurant';
		db.getResults(sql, function(results){
			callback(results);
		});
	}
	
}