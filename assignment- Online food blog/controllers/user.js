const express 	= require('express');
const multer            = require('multer');
const path              = require('path');
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

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'assets/image/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname)) 
	}
  });
  var upload = multer({ storage: storage });


router.get('/', function(req, res){
	res.render('user/index');

});
router.get('/profile', function(req, res){
	let id= req.cookies['uname'];
	userModel.getprofile(id, function(results){
		
		var name = results[0].name;
		var address = results[0].address;
		var phone = results[0].phone;
		var image = results[0].image;
		var email = results[0].email;
		
		res.render('user/profile', {name: name, address: address,  phone: phone, image: image, email: email});

		
	});

});

router.post('/profile', [
    check('name').not().isEmpty().withMessage('Name can not be empty'),
	check('address', 'Please fill the address').not().isEmpty(),
	check('phone', 'enter phone number').isNumeric().isLength({min:11, max:11}).withMessage('Phone number should have 11 digits'),
	check('email', 'Invalid email address').isEmail(),
    
  ], function(req, res){
	const errors = validationResult(req);
	console.log(errors);
	

    if (!errors.isEmpty()) {
		profilealerts = errors.array();
		userModel.getprofile(req.cookies['uname'], function(results){
		
			var name = results[0].name;
			var address = results[0].address;
			var phone = results[0].phone;
			var image = results[0].image;
			var email = results[0].email;
			
			res.render('user/profile', {profilealerts, name: name, address: address,  phone: phone, image: image, email: email});
			
			
		});
		
      
    } else{
		
	let details={
		id: req.cookies['uname'],
        name : req.body.name,
        address : req.body.address,
		phone: req.body.phone,
		email: req.body.email
    };
    console.log(details);

        userModel.update(details, function(status){
        if(status){
            console.log('profile details updated');
			res.redirect('/user/profile');
        }else{
            res.send('try again later!');
        }
    });
	}
});


router.get('/profile/edit', function(req, res){
	let username= req.cookies['uname'];
	userModel.getprofile(username, function(results){
		var image = results[0].image;
		res.render('user/profilepicupdate', { image: image});

		
	});
});


router.post('/profile/edit',  upload.single('pic'), function(req, res){
	let username= req.cookies['uname'];
	let details={
		username: username,
		image: req.file.filename
    };
	userModel.profilePicUpdate(details, function(status){
		if(status){
			console.log('profile pic updated');
			res.redirect('/user/profile');
		}else{
            res.send('something wrong! try again');

		}

	});
	

});



module.exports = router;

