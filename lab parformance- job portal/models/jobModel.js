const db = require('./db');

module.exports= {
	validate: function(user, callback){
		//var sql = `select * from user where username="${user.username}" and password="${user.password}"`;
		let sql= 'select * from user where username="'+user.username+'" and password="'+user.password+'" ';
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = 'select * from job where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getAll: function(callback){
		var sql = "select * from job";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(job, callback){
		let sql= 'insert into job (companyname, title,location, salary, image) values ("'+job.comname+'","'+job.title+'","'+job.location+'","'+job.salary+'","'+job.image+'" )';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},
	update:function(job, callback){
        let sql= 'update job set companyname= "'+job.comname+'", title= "'+job.title+'", location= "'+job.location+'", salary= "'+job.salary+'", image="'+job.image+'" where id= "'+job.id+'"';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	},

	search: function(content, callback){
		var sql = 'SELECT title from job where title like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){

        let sql= 'delete from job where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}