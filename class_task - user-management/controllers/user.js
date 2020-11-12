const express 	= require('express');
const router 	= express.Router();
const fs = require("fs"); 
const userlist     = require("../userlist.json");
router.get('/create', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		console.log(userlist.length);
		res.render('user/create');
	}else{
		res.redirect('/login');
	}
});


router.post('/create', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		// res.send('success');
		//console.log(req.body);
		//console.log( req.session.name.length);
		let id= (1+ (req.session.name.length)).toString();
		let username=req.body.username;
		let password= req.body.password;
		let email= req.body.email;
		let newuser= [id,username,email,password,];
		req.session.name.push(newuser);
		// console.log(newuser);
		// console.log(req.session.name);
		
		let userjson = {
			
			username : username,
			email  : email,
			password  : password
		};
		userlist.push(userjson);
		fs.writeFile("./userlist.json", JSON.stringify(userlist), err => { 
     
			// Checking for errors 
			if (err) throw err;  
		   
			console.log("writing successful");  
		}); 
		
		res.render('home/userlist', {users: req.session.name});	
		

		//res.redirect('/home/userlist');

	}else{
		res.redirect('/login');
	}
});

router.get('/edit/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		let id= (req.params.id)-1;
		var user = {username: req.session.name[id][1], email: req.session.name[id][2], password: req.session.name[id][3]};
		res.render('user/edit', user);
		
	}else{
		res.redirect('/login');
	}
});

router.post('/edit/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		let id= req.params.id;
		let username=req.body.username;
		let password= req.body.password;
		let email= req.body.email;
		let user= [id,username,email,password,];
		req.session.name.splice((req.params.id-1), 1,user); 
		//res.send('updated');
		res.redirect('/home/userlist');
	}else{
		res.redirect('/login');
	}
});

router.get('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		console.log(req.params.id);
		//let username= req.session.name[0][0];
		let id= (req.params.id)-1;
		var user = {username: req.session.name[id][1], password: req.session.name[id][2], email: req.session.name[id][3]};
		res.render('user/delete', user);
	}else{
		res.redirect('/login');
	}
});

router.post('/delete/:id', (req, res)=>{
	
	if(req.cookies['uname'] != null){
		//res.send('done!');
		//req.session.name.splice((req.params.id-1), 1); 
		req.session.name.splice(req.session.name.findIndex(function(i){
			return i.id == req.params.id;
		}), 1);
		// users.splice(users.findIndex(function(i){
		// 	return i.id == req.params.id;
		// }), 1);
		res.redirect('/home/userlist');

	}else{
		res.redirect('/login');
	}
});

module.exports = router;

