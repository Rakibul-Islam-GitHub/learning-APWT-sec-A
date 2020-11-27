const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const loginModel		= require.main.require('./models/loginModel');
const router 		= express.Router();


router.get('/', (req, res)=>{
	if (req.cookies['role'] ==undefined) {
		res.render('login/index');
		
	}else if(req.cookies['role']=='admin'){
		res.redirect('/admin');

	}else{
		res.redirect('/user');
	}
	
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};


	userModel.validate(user, function(status){

		if(status){

			loginModel.getRole(user, function(results){
				if(results[0].role=='admin'){
					console.log(results[0].role);
					res.cookie('uname', req.body.username);
					res.cookie('role', 'admin');
					res.redirect('/admin');
				}else{
					res.cookie('uname', req.body.username);
					res.cookie('role', 'user');
					res.redirect('/user');
				}
			});
			
		}else{
			res.redirect('/login');

		}
		
	});
}); 

module.exports = router;