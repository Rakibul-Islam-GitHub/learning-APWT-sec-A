const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
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

			userModel.getAll(function(results){

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