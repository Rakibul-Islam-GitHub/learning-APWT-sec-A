const db = require('./db');

module.exports= {
	
	getById: function(id, callback){
		var sql = 'select * from restaurant where id = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getMenuById: function(id, callback){
		var sql = 'select * from menu where restaurantid = "'+id+'" ';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	getcomment: function(restaurantid, menuid, callback){
		var sql = 'select * from comment where restaurantid = "'+restaurantid+'" and menuid= "'+menuid+'" ';
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

	getfoodexperience :  function(callback){
		var sql = "select * from foodexp";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	getfoodexperienceById :  function(postid, callback){
		var sql = 'select * from foodexp where id= "'+postid+'"';
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
    insertComment: function(comment, callback){

		let sql= 'insert into comment (restaurantid, menuid, comment, commentby, date, time) values ("'+comment.restaurantid+'", "'+comment.menuid+'", "'+comment.comment+'", "'+comment.commentby+'", "'+comment.date+'", "'+comment.time+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});
		
	},

	insertFoodexp: function(post, callback){

		let sql= 'insert into foodexp (author, post, date) values ("'+post.author+'", "'+post.post+'", "'+post.date+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});
		
	},
	insertFoodexpComment: function(comment, callback){

		let sql= 'insert into foodexpcomment (postid, commentby, comment, date, time) values ("'+comment.postid+'", "'+comment.commentby+'", "'+comment.comment+'", "'+comment.date+'", "'+comment.time+'")';
		db.execute(sql, function(status){

			if(status){
				callback(true);

			}else{
				callback(false);
			}

		});
		
	},

	addMenu : function(menu, callback){
		console.log(menu);
		let sql= 'insert into menu (restaurantid, title, details, price, image) values ("'+menu.restaurantid+'", "'+menu.title+'", "'+menu.details+'", "'+menu.price+'", "'+menu.image+'")';
		
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
		var sql = 'SELECT name from restaurant where name like "%'+content+'%"';
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	delete: function(id, callback){
		let sql= 'delete from restaurant where id= "'+id+'" ';
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});

	}
}