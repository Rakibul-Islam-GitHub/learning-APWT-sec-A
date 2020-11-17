const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const loginModel		= require.main.require('./models/loginModel');
const router 		= express.Router();


router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	
	

	var user = {
		username: req.body.username,
		password: req.body.password
	};


	userModel.validate(user, function(status){

		console.log(status);


		if(status){

			loginModel.getAll(function(results){

				console.log(results[0].role);
				if(results[0].role=='admin'){
					res.cookie('uname', req.body.username);
					res.redirect('/admin');
				}else{
					res.cookie('uname', req.body.username);
					res.redirect('/user');
				}
			});
			



			


		}else{
			res.redirect('/login');

		}
		
	});
}); 

module.exports = router;