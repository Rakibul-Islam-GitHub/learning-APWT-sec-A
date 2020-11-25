const express 	= require('express');
const userModel		= require.main.require('./models/userModel');
const { check, validationResult } = require('express-validator');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	res.render('user/index');

});
router.get('/search', function(req, res){
	res.render('user/search');

});





module.exports = router;

