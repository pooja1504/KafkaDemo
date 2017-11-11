var kafka = require('./kafka/client');
var ejs = require('ejs');
function userdetails(req,res)
{
    kafka.make_request('userdetails_topic',{"username":"pooja"}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results){
                res.send(results);
            }
            else {
                res.send({status:401});
            }
        }
    });
}
exports.userdetails = userdetails;