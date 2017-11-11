
var mongo = require('mongodb');
var mongo = require("./mongo");
var fs = require('fs');
var mongoURL = "mongodb://localhost:27017/KafkaDB";
function handle_registerrequest(msg, callback){
var res = {};
console.log("In handle request:"+ JSON.stringify(msg));
mongo.connect(mongoURL, function(){
    console.log('Connected to Registration page of mongo at: ' + mongoURL);
    var coll = mongo.collection('users');
    username= msg.email;
    password=msg.password;
    firstName=msg.firstName;
    lastName=msg.lastName;
    coll.insert({username: username, password:password, firstName:firstName, lastName:lastName}, function(err, user){
        console.log(err)
        console.log('user',user) 
        if (err){ 
        res.code = "401";
        res.value = "Failed Login";
        callback(null, res);
    }
    else
    {
        res.code="200";
        res.value="Success Registration";
        res.username = msg.username;
        res.password = msg.password;
        res.firstName = msg.firstName;
        res.lastName = msg.lastName;
        fs.mkdir("./uploads/"+msg.email);
        callback(null, res);
    }  
    });
});
    
}

exports.handle_registerrequest = handle_registerrequest;