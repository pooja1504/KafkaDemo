var kafka = require('./kafka/client');
var ejs = require('ejs');
function userdetails(req,res)
{
    kafka.make_request('userdetails_topic',{"username":req.session.username}, function(err,results){
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
function edituserdetails(req,res)
{
    kafka.make_request('edituserdetails_topic',req.body, function(err,results){
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
exports.edituserdetails = edituserdetails;