const express 	        = require('express');
const multer            = require('multer');
const path              = require('path');
const jobModel = require.main.require('./models/jobModel');
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


router.get('/joblist', (req, res)=>{

	jobModel.getAll(function(results){
		console.log(results[0]);
		let job= {
			comname : results[0].companyname,
			title : results[0].title,
			location : results[0].location,
			salary : results[0].salary,
			image : results[0].image
		}
		console.log(job);
		res.render('job/joblist', {jobs: results});
	});

});


router.get('/search', function(req, res){
	res.render('job/search');

});

router.post('/search', function(req, res){
	//console.log(req.body.query);
	let content= req.body.query;

	jobModel.search(content, function(results){
		//res.render('home/employerlist', {users: results});
		//console.log(results[0]);
		res.json(results[0]);
	});


	

});


router.get('/create', (req, res)=>{
	res.render('job/create');
});


router.post('/create', upload.single('pic'), (req, res)=>{
	       

	
			let job={
				image :  req.file.filename,
				comname : req.body.comname,
				title : req.body.title,
				location : req.body.location,
				salary: req.body.salary
			
				

			};
			jobModel.insert(job, function(status){

				if(status){
					console.log('job inserted');
					res.redirect('/job/joblist');
				}else{
					res.redirect('/employer');

				}

			});
});

router.get('/edit/:id', (req, res)=>{
	let id= req.params.id;

	jobModel.getById(id, function(results){
		
		let job= results[0];
		  
		  res.render('job/edit', job);
	});
});

router.post('/edit/:id', upload.single('pic'),  [
    check('comname').not().isEmpty().withMessage('Please fill all fields!'),
	check('title', 'Please enter the title ').not().isEmpty(),
	check('location').not().isEmpty().withMessage(' can not be null'),
	check('salary').not().isEmpty().withMessage('This field can not be null'),
	
    
  ], (req, res)=>{
	const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
		
      return res.status(422).json(errors.array());
    } else{
		
		let job={
			image : req.file.filename,
			id : req.params.id,
			comname : req.body.comname,
			title : req.body.title,
			location : req.body.location,
			salary: req.body.salary,
		
		
		};
		jobModel.update(job, function(status){
	
			if(status){
				console.log('job updated');
				res.redirect('/job/joblist');
			}else{
	
			}
	
		});

	}

	


	//res.redirect('/job/joblist');
});

router.get('/delete/:id', (req, res)=>{
	let id= req.params.id;

	jobModel.getById(id, function(results){
		console.log(results[0].name);
		var comname = results[0].companyname;
		var title = results[0].title;
		var location = results[0].location;

		res.render('job/delete', {comname: results[0].companyname, title: results[0].title, location: results[0].location, salary: results[0].salary});

		
	});
	
	
});

router.post('/delete/:id', (req, res)=>{
    let id=  req.params.id;

    

    jobModel.delete(id, function(status){

		if(status){
			res.redirect('/job/joblist');

		}else{
			res.redirect('/employer');

		}
        
        
	});

	
});



module.exports = router;