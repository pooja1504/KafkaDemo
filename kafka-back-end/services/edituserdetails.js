var mongo = require('mongodb');
var mongo = require("./mongo");
var fs = require('fs');
var mongoURL = "mongodb://localhost:27017/KafkaDB";
function handle_edituserdetailsrequest(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to edituserdetails page of mongo at: ' + mongoURL);
        var coll = mongo.collection('users');
        coll.update({username:msg.username},{username: msg.username, password:msg.password, firstName:msg.firstName, lastName:msg.lastName, work:msg.work,education:msg.education,phone:msg.phone}, function(err, user){
            console.log(err)
            console.log('user',user)
            if (err){
                res.code = "401";
                res.value = "Could not Update";
                callback(null, res);
            }
            else
            {
                res.code="200";
                res.value="Success Updation";
                res.username = msg.username;
                res.password = msg.password;
                res.firstName = msg.firstName;
                res.lastName = msg.lastName;
                res.work = msg.work;
                res.education = msg.education;
                res.phone = msg.phone;
                console.log(res.phone+res.work);
                callback(null, res);
            }
        });
    });

}

exports.handle_edituserdetailsrequest = handle_edituserdetailsrequest;