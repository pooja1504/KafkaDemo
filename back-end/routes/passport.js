var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/login";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username , password, done) {
        console.log('in passport');
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:"bhavan@b.com",password:"a"});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));

passport.use('local-signup', new LocalStrategy(function(req,username , password, done) {
        console.log('in passport');
        kafka.make_request('register_topic',{"username":username,"password":password,"firstName":req.body.firstName,"lastName":req.body.lastName}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){
                    done(null,{username:"bhavan@b.com",password:"a"});
                }
                else {
                    done(null,false);
                }
            }
        });
    }));


};




