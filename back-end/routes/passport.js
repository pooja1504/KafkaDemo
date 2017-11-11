var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoURL = "mongodb://localhost:27017/KafkaDB";
var kafka = require('./kafka/client');

module.exports = function(passport) {
    passport.use('login', new LocalStrategy(function(username, password, done) {
        console.log('in passport');
        console.log(username);
        kafka.make_request('login_topic',{"username":username,"password":password}, function(err,results){
            console.log('in result');
            console.log(results);
            if(err){
                done(err,{});
            }
            else
            {
                if(results.code == 200){

                    done(null,results);
                }
                else {
                    done(null,false);
                }
            }
        });
    }));
}; 






