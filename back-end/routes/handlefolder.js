var kafka = require('./kafka/client');
var ejs = require('ejs');
function folderupload(req,res)
{
    var myfolder = req.body.myfolder;
    console.log("its foldername in server"+myfolder);
    kafka.make_request('folderupload_topic',{"foldername":myfolder}, function(err,results){
        console.log('in result');
        console.log(results);
        if(err){
            done(err,{});
        }
        else
        {
            if(results){
                res.send({filelist:results,status:201});
            }
            else {
                res.send({status:200});
            }
        }
    });
}
exports.folderupload = folderupload;