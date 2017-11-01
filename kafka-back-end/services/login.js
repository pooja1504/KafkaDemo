var mongo = require('mongodb');
//var mongoose = require('mongoose');
//const User = require('mongoose').model('User');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KafkaDB";
var User = require('../user');
function handle_loginrequest(msg, callback){
        var res = {};  
        mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        console.log(msg.username+msg.password);
        coll.findOne({username: msg.username, password:msg.password}, function(err, user){
                    if (user) {
                      console.log("yes its login");
                        res.code="200";
                        res.value = "Success Login";
                        res.username = msg.username;
                        res.password = msg.password;
                        callback(null, res);

                    } else {
                      console.log("its error in login");
                        res.status="401";
                        res.value = "Failed Login";
                        callback(null, res);
                    }
                });
        
});
}
exports.handle_loginrequest = handle_loginrequest;