var fs = require('fs');
var testFolder = './uploads/';
var isDirectory = require('is-directory');
var forloop = require('forloop');
function handle_listfilesrequest(msg, callback){
    var res = {};
    console.log(msg.username);
    testFolder += "pooja";
    fs.readdir(testFolder, function (err, files)
    {
        if (!err) {
            console.log("directory created");
            res.status="200";
            console.log(files);
            res.files=files;
        }
        else {
            res.status="401";
        }
        callback(null,res);
    });


}

exports.handle_listfilesrequest = handle_listfilesrequest;