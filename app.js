require('dotenv').config();
import config from './config/settings';

var path = require('path'),
	http = require('http'),
    fs = require('fs'),
    sql = require('mssql'),
	_ = require("underscore");

global.conf = config;
global.sql = sql;
global._ = _;

const dbConf = {
    user: conf.mssql.user,
    password: conf.mssql.password,
    server: conf.mssql.host,
    database: conf.mssql.db,
 
    options: {
        encrypt: true
    }
}

global.dbConf = dbConf;

var express = require('express'),
	session = require('express-session'),
	hbs = require('express-handlebars'),
	db  = require('express-myconnection'),
	helpers = require('./helpers/functions'),
	bodyParser = require('body-parser');
var app = express();
var q = require('q');

global.q = q;
global.helpers = helpers;

var index = require('./routes/index');
var users = require('./routes/users');
var ektp = require('./routes/ektp');

app.set('port', config.web.port);
app.set('host', config.web.host);

var hbsHelpers = hbs.create({
	helpers: helpers.helpers,
	extname:'hbs',
	defaultLayout:'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
});

app.use(session({
    secret: 'adi',
    name: 'adiraputraadira',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.engine('.hbs', hbsHelpers.engine);
app.set('view engine', '.hbs');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', index.main);
app.post('/users', users.get_users);
app.post('/ektp', ektp.ektp);

app.use(function(req, res, next){
	res.send({time:new Date(), status: -1});
});

http.createServer(app).listen(app.get('port'),app.get('host'), function(){
	console.log('Express server listening on host: '+app.get('host')+' port: ' + app.get('port'));
});

