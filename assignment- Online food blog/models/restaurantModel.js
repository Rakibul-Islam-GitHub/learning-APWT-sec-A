const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = 'select * from restaurant where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from restaurant";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(restaurant, callback){

		let sql= 'insert into restaurant (name, location, phone, description, image) values ("'+restaurant.name+'", "'+restaurant.location+'", "'+restaurant.phone+'", "'+restaurant.description+'", "'+restaurant.image+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});
		

	},
	update:function(restaurant, callback){
		let sql= 'update restaurant set name= "'+restaurant.name+'", location= "'+restaurant.location+'", phone= "'+restaurant.phone+'", description= "'+restaurant.description+'", image="'+restaurant.image+'" where id= "'+restaurant.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

		

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