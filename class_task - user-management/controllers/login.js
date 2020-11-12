const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	//console.log(req.body.username);
	//console.log(req.body.password);

	if(req.body.username == req.body.password){
		//req.session.uname = req.body.username;
		res.cookie('uname', 'rakibul');
		res.redirect('/home');

	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



