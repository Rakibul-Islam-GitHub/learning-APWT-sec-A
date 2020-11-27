const express 		= require('express');
const multer            = require('multer');
const path              = require('path');
const { runInNewContext } = require('vm');
const loginModel		= require.main.require('./models/loginModel');
const userModel         = require.main.require('./models/userModel');
const restaurantModel         = require.main.require('./models/restaurantModel');
const router 		= express.Router();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'assets/image/')
	},
	filename: function (req, file, cb) {
	  cb(null, Date.now() + path.extname(file.originalname)) 
	}
  });
  var upload = multer({ storage: storage });


  router.get('/', (req, res)=>{
    restaurantModel.getAll(function(results){
console.log(results);
      if(results.length >0){
        
        res.render('home/index', {restaurants: results, role: req.cookies['role']});
      }
  
});

  });

  router.post('/search', function(req, res){
    let content = req.body.query;
	console.log(content);
	restaurantModel.search(content, function(results){

        if(results.length >0){
		 
		res.json(results);
		

        }
		
	});

   
  });


router.post('/', (req, res)=>{
    
  });

router.get('/restaurant/:id', (req, res)=>{
  let id= req.params.id;
    restaurantModel.getMenuByresId(id, function(results){

      if(results.length >0){
        restaurantModel.getRestaurantdetails(id, function(restaurants){
          let restaurant={
            description : restaurants[0].description,
            goal : restaurants[0].goal,
            name : restaurants[0].name

          }
          res.render('home/restaurant', {menus: results, resdetails:restaurant, role: req.cookies['role']});
         

        });

        
       
      }else{
        restaurantModel.getRestaurantdetails(id, function(restaurants){
          let restaurant={
            description : restaurants[0].description,
            goal : restaurants[0].goal,
            name : restaurants[0].name

          }
          res.render('home/restaurant', {menus: results, resdetails:restaurant, role: req.cookies['role']});
         

        });
       
        
      }
  
});

  });

  router.get('/restaurant/:restaurantid/menu/:menuid', (req, res)=>{
    let restaurantid= req.params.restaurantid;
    let menuid= req.params.menuid;
    console.log(menuid);
      restaurantModel.getMenuById(menuid, function(results){
       
        if(results.length >0){
          restaurantModel.getcomment(restaurantid,menuid, function(comments){
            if(comments.length>0){
          res.render('home/menudetails', {role: req.cookies['role'], menus: results, comments});
            }else{
              res.render('home/menudetails', {role: req.cookies['role'], menus: results, comments});
            }
          })
         
         
        }else{
          res.render('home/menudetails', {role: req.cookies['role'], menus: results, comments});
        }
    
  });
  
});

router.post('/restaurant/:restaurantid/menu/:menuid', (req, res)=>{
  let restaurantid= req.params.restaurantid;
  let menuid= req.params.menuid;
  const date = new Date();
	var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hour = date.getHours();

var ampm = hour >= 12 ? 'PM' : 'AM';
hour = hour % 12;
hour = hour ? hour : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes;
let time= hour +':'+minutes+':'+seconds +' '+ampm;

const currentdate = date.toISOString().split("T")[0];
  let comment= {
    restaurantid :restaurantid,
    menuid: menuid,
    comment: req.body.comment,
    commentby : req.cookies['uname'],
    date : currentdate,
    time : time

  };
  
  restaurantModel.insertComment(comment, function(status){

    if(status){
      
      res.redirect('/restaurant/'+restaurantid+'/menu/'+menuid+'');
    }

});

});

router.get('/foodexperience', (req,res)=>{

  restaurantModel.getfoodexperience(function(results){
    if (results.length>0) {
      res.render('home/foodexperience', {results : results, role: req.cookies['role']});
    }


  });


});

router.post('/foodexperience', (req,res)=>{
   console.log(req.body.post);
   const date = new Date();
   var seconds = date.getSeconds();
 var minutes = date.getMinutes();
 var hour = date.getHours();
 
 var ampm = hour >= 12 ? 'PM' : 'AM';
 hour = hour % 12;
 hour = hour ? hour : 12; // the hour '0' should be '12'
 minutes = minutes < 10 ? '0'+minutes : minutes;
 let time= hour +':'+minutes+':'+seconds +' '+ampm;
 
 const currentdate = date.toISOString().split("T")[0];
   let posts= {
     author : req.cookies['uname'],
     post : req.body.post,
     date : currentdate
   }
   restaurantModel.insertFoodexp(posts, function(status){

    if(status){
       
        res.redirect('/foodexperience');
       
        
    }else{
        res.send('somwthing wrong!');

    }

});

});

router.get('/foodexperience/:id', (req,res)=>{

  restaurantModel.getfoodexperienceById(req.params.id, function(results){
    if (results.length>0) {
      restaurantModel.getfoodexperienceComment(req.params.id, function(comments){
        if (results.length>0) {
          console.log(typeof comments);
          res.render('home/foodexperiencedetails', {role: req.cookies['role'], results : results, comments: comments});
        }else{
          
          res.render('home/foodexperiencedetails', {role: req.cookies['role'], results : results});}
    
      });
    }else{ res.render('home/foodexperiencedetails', {role: req.cookies['role'], results : results, comments: comments});}

  });
});
router.post('/foodexperience/:id', (req,res)=>{
  const date = new Date();
  var d = new Date();
  var n = d.toLocaleString().split(",")[0];
  var year= n.split("/")[2];
  var month= n.split("/")[1];
  var day= n.split("/")[0];
  var currentdate= year+'-'+month+'-'+day;

  var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hour = date.getHours();

var ampm = hour >= 12 ? 'PM' : 'AM';
hour = hour % 12;
hour = hour ? hour : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? '0'+minutes : minutes;
let time= hour +':'+minutes+':'+seconds +' '+ampm;


  let comment= {
    postid : req.params.id,
    commentby : req.cookies['uname'],
    comment : req.body.post,
    date : currentdate,
    time : time
  }
  
  restaurantModel.insertFoodexpComment(comment, function(status){

   if(status){
      
       res.redirect('/foodexperience/'+req.params.id+'');
      
       
   }else{
       res.send('somwthing wrong!');

   }

});
});

router.get('/signup', (req, res)=>{
	res.render('user/signup');
});

router.post('/signup', upload.single('pic'), (req, res)=>{

    let user={
        image :  req.file.filename,
        name : req.body.name,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone,
        address: req.body.address,
        role : 'user'
    
    };

    
    userModel.insert(user, function(status){

        if(status){
            console.log(user);
            res.redirect('/login');
           
            
        }else{
            res.redirect('/home/signup');

        }

    });


	
	
}); 

module.exports = router;