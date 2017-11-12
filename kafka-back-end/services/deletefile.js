var fs = require('fs');
var testFolder = './';
function handle_deletefilerequest(msg, callback){
    var res = {};
    console.log(msg.filename);
    fs.unlink('./uploads/'+msg.username+"/"+msg.filename, function (err) {
        if (err) res.status="401";
        // if no error, file has been deleted successfully
        console.log('File deleted!');
        res.status="200";
    });
    callback(null,res);

}

exports.handle_deletefilerequest = handle_deletefilerequest;