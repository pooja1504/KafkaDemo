var fs = require('fs');
var mongo = require('mongodb');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/KafkaDB";
function handle_fileuploadrequest(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    mongo.connect(mongoURL, function(){
        console.log('Connected to Registration page of mongo at: ' + mongoURL);
        var coll = mongo.collection('files');
        coll.insert({username: msg.username,fileName:msg.fileName,filePath:msg.filePath,star:msg.star}, function(err,results){
            console.log(err)
            console.log('user',results)
            if (err){
                res.code = "401";
                res.value = "Failed upload";
                callback(null, res);
            }
            else
            {
                res.code="204";
                res.value="Upload Success";
                callback(null, res);
            }
        });
    });


}

exports.handle_fileuploadrequest = handle_fileuploadrequest;