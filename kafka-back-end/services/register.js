const User = require('mongoose').model('KafkaDB');
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
}
    callback(null, res);
}

exports.handle_request = handle_request;