var kafka = require('./kafka/client');
var ejs = require('ejs');
function listfiles(req,res)
{
    console.log("its listfiles in server");
    kafka.make_request('listfiles_topic',{"foldername":myfolder}, function(err,results){
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
exports.listfiles = listfiles;