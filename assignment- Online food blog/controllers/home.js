const express 		= require('express');
const multer            = require('multer');
const path              = require('path');
const loginModel		= require.main.require('./models/loginModel');
const router 		= express.Router();


router.get('/signup', (req, res)=>{
	res.render('user/signup');
});

router.post('/', (req, res)=>{

	
	
}); 

module.exports = router;