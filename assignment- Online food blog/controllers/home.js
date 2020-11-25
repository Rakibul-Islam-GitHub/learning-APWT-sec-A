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
        
        res.render('home/index', {restaurants: results});
      }
  
});

  });

  router.get('/restaurant/*',  (req, res, next)=>{
    if(req.cookies['uname'] == null){
      res.redirect('/login');
    }else{
      next();
    }
  });

router.post('/', (req, res)=>{
    
  });

router.get('/restaurant/:id', (req, res)=>{
  let id= req.params.id;
    restaurantModel.getMenuById(id, function(results){

      if(results.length >0){
        
        res.render('home/restaurant', {menus: results});
      }
  
});

  });

  router.get('/restaurant/:restaurantid/menu/:menuid', (req, res)=>{
    let restaurantid= req.params.restaurantid;
    let menuid= req.params.menuid;
      restaurantModel.getMenuById(restaurantid, function(results){
  
        if(results.length >0){
          restaurantModel.getcomment(restaurantid,menuid, function(comments){

            if(comments.length>0){
          res.render('home/menudetails', {menus: results, comments});
           
      
            }else{
             res.send('something wrong!');
             
      
            }
          
          
      
          })
          
          
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