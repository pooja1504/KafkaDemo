var fs = require('fs');
var testFolder = './';
function handle_folderuploadrequest(msg, callback){
    var res = {};
    console.log(msg.foldername);
    fs.mkdir("./uploads/pooja/"+msg.foldername,function(err) {
        if (!err) {
            console.log("directory created");
            res.status="200";
            res.myfolder=msg.foldername;
        }
        else {
            res.status="401";
        }
        callback(null,res);
    });


}

exports.handle_folderuploadrequest = handle_folderuploadrequest;