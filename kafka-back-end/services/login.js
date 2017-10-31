var mongo = require('mongodb');
//var mongoose = require('mongoose');
//const User = require('mongoose').model('User');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/login";
var User = require('../user');
function handle_loginrequest(msg, callback){
        var res = {};  
        mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('login');
        coll.findOne({ email: msg.email }, (err, user) => {
        if (err) { res.status="401";
         res.value = "Failed Login"; }

        if (!user) {

         res.status="401";
         res.value = "Failed Login";
        }
        // check if a hashed user's password is equal to a value saved in the database
        user.comparePassword(msg.password, (passwordErr, isMatch) => {
          if (err) { res.status="401";
         res.value = "Failed Login"; }

          if (!isMatch) {
            res.status="401";
            res.value = "Failed Login";
          }
          res.code = "200";
            res.value = "Success Login";
        });
      });
        callback(null, res);
});
}
exports.handle_loginrequest = handle_loginrequest;