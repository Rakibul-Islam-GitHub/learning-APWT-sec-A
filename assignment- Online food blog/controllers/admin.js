const express 	= require('express');
const multer            = require('multer');
const path              = require('path');
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
	  cb(null, 'assets/image/restaurant/')
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
	

});
router.post('/profile', function(req, res){
	

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
		console.log(results[0]);
		
		
		res.render('admin/userlist', {users: results});
	});
	

});



router.get('/edit/:id', (req, res)=>{
	let id= req.params.id;

	
  
});

router.post('/edit/:id', [
    check('name').not().isEmpty().withMessage('Please fill all fields!'),
	check('password', 'Please enter Your password ').not().isEmpty(),
	check('company').not().isEmpty().withMessage(' can not be null'),
	check('contact').not().isEmpty().withMessage('This field can not be null'),
	check('username').not().isEmpty().withMessage('This field can not be null'),
    
  ],  (req, res)=>{

	const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
		
      return res.status(422).json(errors.array());
    } else{
		let user={
			id : req.params.id,
			name : req.body.name,
			company : req.body.company,
			contact : req.body.contact,
			username: req.body.username,
			password: req.body.password
			
	
		};
		console.log(user);
	
		userModel.update(user, function(status){
	
	
			if(status){
				console.log('user updated');
				res.redirect('/home/employerlist');
			}else{
	
			}
	
		});

	}

	
	
	// res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	let id= req.params.id;

	userModel.getById(id, function(results){
		console.log(results[0].name);
		var empname = results[0].name;
		var empcompany = results[0].company;
		var empcontact = results[0].contact;

		res.render('admin/delete', {name: empname, company: empcompany, contact: empcontact});

		
	});


	
	
});

router.post('/delete/:id', (req, res)=>{

	let id= req.params.id;


    userModel.delete(id, function(status){
        
        res.redirect('/home/employerlist');
	});
	// res.redirect('/home/employerlist');
});

router.get('/userlist', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/employerlist', {users: results});
	});

})

module.exports = router;

