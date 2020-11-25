const express 	= require('express');
const multer            = require('multer');
const path              = require('path');
const userModel		= require.main.require('./models/userModel');
const restaurantModel		= require.main.require('./models/restaurantModel');
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
	res.render('admin/index');

});
router.get('/search', function(req, res){
	res.render('admin/search');

});

router.post('/search', function(req, res){
	

	

});

router.get('/profile', function(req, res){

    let id= req.cookies['uname'];
	userModel.getprofile(id, function(results){
		
		var name = results[0].name;
		var address = results[0].address;
		var phone = results[0].phone;
		var image = results[0].image;
		var email = results[0].email;
		
		res.render('admin/profile', {name: name, address: address,  phone: phone, image: image, email: email});

		
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
			
			res.render('admin/profile', {profilealerts, name: name, address: address,  phone: phone, image: image, email: email});
			
			
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
			res.redirect('/admin/profile');
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
		
		
		res.render('admin/profilepicupdate', { image: image});

		
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
			res.redirect('/admin/profile');
		}else{
            res.send('something wrong! try again');

		}

	});
	

});



router.get('/addrestaurant', function(req, res){

    res.render('admin/addrestaurant');
	

});
router.post('/addrestaurant', upload.single('pic'), (req, res)=>{

    let restaurant={
			
        name : req.body.name,
        location : req.body.location,
        phone : req.body.phone,
        description: req.body.description,
        image: req.file.filename
        

    };
    
    restaurantModel.insert(restaurant, function(status){

        if(status){
            console.log('restaurant inserted');
            res.redirect('/admin');
        }else{
            res.redirect('/admin/addrestaurant');

        }

    });

	// const errors = validationResult(req);
    // console.log(errors);

    // if (!errors.isEmpty()) {
		
    //   return res.status(422).json(errors.array());
    // } else {
		

		
      
    // }
	
	
			
});
router.get('/userlist', function(req, res){
    userModel.getAll(function(results){

        if(results.length >0){
          
		res.render('admin/userlist', {users: results});

        }
		
	});
	

});

router.get('/userlist/delete/:id', (req, res)=>{
	let id= req.params.id;

	    userModel.getById(id, function(results){
		
		var name = results[0].name;
		var email = results[0].email;
		var address = results[0].phone;

		res.render('admin/userdelete', {name: name, email: email, address: address});

		
	});


	
	
});

router.get('/allrestaurant', function(req, res){
    restaurantModel.getAll(function(results){

        if(results.length >0){
          
		res.render('admin/allrestaurant', {restaurants: results});

        }
		
	});


});



router.get('/allrestaurant/edit/:id', (req, res)=>{
	let id= req.params.id;

	restaurantModel.getById(id, function(results){
		console.log(results[0].name);
		var name = results[0].name;
		var location = results[0].location;
		var phone = results[0].phone;
		var description = results[0].description;
		


		res.render('restaurant/edit', {name: name, location: location, phone: phone, description: description});

		
	});
  
});

router.post('/allrestaurant/edit/:id', upload.single('pic'), (req, res)=>{
    
    console.log(req.file.filename);

    let restaurant={
		id : req.params.id,	
        name : req.body.name,
        location : req.body.location,
        phone : req.body.phone,
        description: req.body.description,
        image: req.file.filename
        

    };
    console.log(restaurant);

    restaurantModel.update(restaurant, function(status){


        if(status){
            console.log('restaurant updated');
            res.redirect('/admin/allrestaurant');
        }else{

        }

    });

  
});


router.get('/allrestaurant/delete/:id', (req, res)=>{
	let id= req.params.id;

	restaurantModel.getById(id, function(results){
		console.log(results[0].name);
		var name = results[0].name;
		var location = results[0].location;
		var phone = results[0].phone;

		res.render('restaurant/delete', {name: name, location: location, phone: phone});

		
	});


	
	
});

router.post('/allrestaurant/delete/:id', (req, res)=>{

	let id= req.params.id;


    restaurantModel.delete(id, function(status){
        if(status){
            res.redirect('/admin/allrestaurant');
        }else{
            res.send('<h1>Something wrong! Try again </h1>');
        }

        
        
	});
	
});
router.get('/allrestaurant/addmenu/:id', (req, res)=>{

    res.render('admin/addmenu');
    
});
router.post('/allrestaurant/addmenu/:id', upload.single('pic'), (req, res)=>{

    let id= req.params.id;
    let menu={
		restaurantid: id,	
        title : req.body.title,
        details : req.body.details,
        price : req.body.price,
        image: req.file.filename
        

    };


    restaurantModel.addMenu(menu, function(status){
        if(status){
            res.redirect('/admin/allrestaurant');
        }else{
            res.send('<h1>Something wrong! Try again </h1>');
        }

        
        
	});
	
});




module.exports = router;

