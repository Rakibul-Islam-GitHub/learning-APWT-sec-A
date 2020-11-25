const db = require('./db');

module.exports= {

	validate: function(user, callback){
		//var sql = `select * from user where username="${user.username}" and password="${user.password}"`;
		let sql= 'select * from users where username="'+user.username+'" and password="'+user.password+'" ';
		db.execute(sql, function(status){
			if(status){
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
		var sql = "select * from users where role!='admin'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getprofile: function(username, callback){
		var sql = "select * from users where username= '"+username+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},



	insert: function(user, callback){

		let sql= 'insert into users (name, username, password, email, phone, address, image,role) values ("'+user.name+'", "'+user.username+'", "'+user.password+'", "'+user.email+'", "'+user.phone+'", "'+user.address+'", "'+user.image+'", "'+user.role+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});

	},
	update:function(user, callback){
		let sql= 'update users set name= "'+user.name+'", address= "'+user.address+'", phone= "'+user.phone+'", email="'+user.email+'" where username= "'+user.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	profilePicUpdate: function(user, callback){
		let sql= 'update users set image= "'+user.image+'" where username= "'+user.username+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},

	search: function(content, callback){
		var sql = 'SELECT name from users where name like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){
		let sql= 'delete from users where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}