var kafka = require('./kafka/client');
var ejs = require('ejs');
function folderupload(req,res)
{
    var myfolder = req.body.myfolder;
    console.log("its foldername in server"+myfolder);
    kafka.make_request('folderupload_topic',{"username":req.session.username,"foldername":myfolder}, function(err,results){
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
function sharefolder(req,res)
{
    var mysharedfolder = req.body.mysharedfolder;
    var sharedemail = req.body.sharedemail;
    kafka.make_request('sharefolder_topic',{"username":req.session.username,"mysharedfolder":mysharedfolder,"sharedemail":sharedemail}, function(err,results){
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
exports.folderupload = folderupload;
exports.sharefolder= sharefolder;