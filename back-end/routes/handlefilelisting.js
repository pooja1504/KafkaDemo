var kafka = require('./kafka/client');
var ejs = require('ejs');
function listfiles(req,res)
{
    console.log("its session in listfiles"+req.session.username);
    console.log("its listfiles in server");
    var username = "pooja";
    kafka.make_request('listfiles_topic',{"username":req.session.username}, function(err,results){
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
function deletefile(req,res)
{
    kafka.make_request('deletefile_topic',{"username":req.session.username,"filename":req.body.file}, function(err,results){
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
function starfile(req,res)
{
    console.log("its starfile func"+req.body.payload);
    kafka.make_request('starfile_topic',{"username":req.session.username,"filename":req.body.payload}, function(err,results){
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
exports.deletefile = deletefile;
exports.starfile=starfile;