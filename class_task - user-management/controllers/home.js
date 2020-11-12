const express 	= require('express');
const router 	= express.Router();


router.get('/', (req, res)=>{

	
	if(req.cookies['uname'] != null){
		
		res.render('home/index', {name: 'Rakibul', id:'123'});		
	}else{
		res.redirect('/login');
	}
});


router.get('/userlist', (req, res)=>{

	if(req.cookies['uname'] != ""){

		
		
		if(req.session.name==undefined){

			req.session.name= [
				["1", 'Rakibul', 'abc@gmail.com', '1243'],
				["2", 'pqr', 'pqr@gmail.com', '1243'],
				["3", 'xyz', 'xyz@gmail.com', '1243']
			];

		}
		
		
		res.render('home/userlist', {users: req.session.name});		
	}else{
		res.redirect('/login');
	}
})

module.exports = router;

//url design eg. /logout -> get or post request
//adding middleware to app.js
//creating controller/router  eg. router.get(), router.post()
//creating VIEWS
//sending response -> json, ejs
