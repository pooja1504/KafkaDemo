var mongo = require('mongodb');
//var mongoose = require('mongoose');
//const User = require('mongoose').model('User');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KafkaDB";
var User = require('../user');
function handle_userdetailsrequest(msg, callback){
    var res = {};
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        coll.findOne({username:msg.username}, function(err, user){
            if (user) {
                res.code="200";
                res.user=user;
                callback(null, res);

            } else {
                console.log("its error in login");
                res.status="401";
                res.value = "Failed to get UserDetails";
                callback(null, res);
            }
        });

    });
}
exports.handle_userdetailsrequest = handle_userdetailsrequest;