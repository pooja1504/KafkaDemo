var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');
require('./routes/passport')(passport);
var kafka = require('./routes/kafka/client');
var routes = require('./routes/index');
var users = require('./routes/users');
var handlefolder = require('./routes/handlefolder');
var handlefilelisting = require('./routes/handlefilelisting');
var handleuserdetails=require('./routes/handleuserdetails')
var mongoSessionURL = "mongodb://localhost:27017/KafkaDB";
var expressSessions = require("express-session");
var mongoStore = require("connect-mongo/es5")(expressSessions);
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSessions({
    secret: "CMPE273_passport",
    resave: false,
    //Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, //force to save uninitialized session to db.
    //A session is uninitialized when it is new but not modified.
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 6 * 1000,
    store: new mongoStore({
        url: mongoSessionURL
    })
}));
app.use(passport.initialize());
app.use('/', routes);
app.use('/users', users);
app.post('/folderupload',handlefolder.folderupload);
app.post('/listfiles',handlefilelisting.listfiles);
app.post('/userdetails',handleuserdetails.userdetails);

app.post('/logout', function(req,res) {
    console.log(req.session.user);
    req.session.destroy();
    console.log('Session Destroyed');
    res.status(200).send();
});

app.post('/login', function(req, res,next) {
console.log(req.body.username);
    console.log("its login in app.js");
    passport.authenticate('login', function(err, user) {
        console.log("its user"+user);
        if(err) {
            res.status(500).send();
        }

        if(!user) {
            res.status(401).send();
        }
        req.session.username = user.username;
        console.log(req.session.user);
        console.log("session initilized");
        //return res;
        return res.status(201).send(user);
    })(req,res,next);
});
app.post('/signup',function(req,res,next){
    console.log(req.body);
kafka.make_request('register_topic',req.body, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
              res.status(500).send();
            }
            else
            {
                if(results.code == 200){
                    return res.status(201).send(results);
                }
                else {
                    res.status(500).send();
                }
            }
        });
});
app.post('/listdir',function(req,res){
var dir = req.body.dir;
console.log(dir);
kafka.make_request('listdir_topic',{"dirname":dir}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results){
                    res.send({filelist:results,status:201});
                }
                else {
                    res.send({status:200});
                }
            }
        });
});

module.exports = app;
