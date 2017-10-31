const User = require('mongoose').model('KafkaDB');

function handle_loginrequest(msg, callback){
        var res = {};    
    User.findOne({ email: msg.email }, (err, user) => {
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
}
    /*var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));

    if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);
}
*/
exports.handle_loginrequest = handle_loginrequest;