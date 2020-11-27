const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{


	res.clearCookie('uname');
	res.clearCookie('role');
	//res.cookie['role']== null;
	res.redirect('/');
});


module.exports = router;



