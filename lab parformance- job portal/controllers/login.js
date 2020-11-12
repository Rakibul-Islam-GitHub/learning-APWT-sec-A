const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
//const mysql = require('mysql');
const router 		= express.Router();


router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	// connection.connect((err) => {
	// 	if(err) throw err;
	// 	console.log('Connected to MySQL Server!');
	// });

	var user = {
		username: req.body.username,
		password: req.body.password
	};


	userModel.validate(user, function(status){
		if(status){
			res.cookie('uname', req.body.username);

			if(req.body.username=="admin"){
				res.redirect('/home');

			}else{
				res.redirect('/employer');
			}
			
		}else{
			res.redirect('/login');

		}
	});
}); 

module.exports = router;