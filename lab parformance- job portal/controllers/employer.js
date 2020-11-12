const express 	= require('express');
const userModel		= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{

	userModel.getAll(function(results){
		
		let name= {
			name : results[0].name
			
	
		};
		res.render('employer/index', name);
	});

	
	
});


module.exports = router;

