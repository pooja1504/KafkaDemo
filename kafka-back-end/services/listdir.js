var fs = require('fs');
var testFolder = './';
function handle_listdirrequest(msg, callback){
    console.log("In handle request:"+ JSON.stringify(msg));
    var res = {};
    testFolder += msg.dirname;
    console.log(testFolder);
    fs.readdir(testFolder, function (err, files) 
    {
        console.log("filelist"+files);
        res = files;
        callback(null, res);
    });
    
}

exports.handle_listdirrequest = handle_listdirrequest;