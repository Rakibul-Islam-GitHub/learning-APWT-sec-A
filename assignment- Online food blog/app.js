//declaration
const express 			= require('express');	
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');

const home				= require('./controllers/home');
const login				= require('./controllers/login');
const logout			= require('./controllers/logout');
const user				= require('./controllers/user');


const app				= express();
const port				= 3000;

//configuration
app.set('view engine', 'ejs');


//middleware
app.use('', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/home', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/user', user);


//router
app.get('/', (req, res)=>{

	res.render('home/index');
	
	
});

//server startup
app.listen(port, (error)=>{
	console.log('server strated at '+port);
});