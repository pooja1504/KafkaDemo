var mongo = require('mongodb');
//var mongoose = require('mongoose');
//const User = require('mongoose').model('User');
//var User = require('../models/user');
var User = require('../user');
function handle_registerrequest(msg, callback){
var res = {};
console.log("In handle request:"+ JSON.stringify(msg));
const newUser = new User(msg);
newUser.save((err)=>{
    if (err){ 
        res.code = "401";
        res.value = "Failed Login";
    }
    else
    {
        res.code="200";
        res.value="Success Registration";
    }
});
    callback(null, res);
}

exports.handle_registerrequest = handle_registerrequest;