var copydir = require('copy-dir');
var testFolder = './';
function handle_sharefolderrequest(msg, callback){
    var res = {};
    console.log("its sharedfolder"+msg.mysharedfolder+"its shared email"+msg.sharedemail);
    copydir('./uploads/pooja/hiyu', './uploads/dev@gmail.com', function (err) {
        if (err){
            console.log('An error occured while copying the folder.')
            console.error(err);

        }
        console.log('Copy completed!');
        res.status="200";
        callback(null,res);
    });


}

exports.handle_sharefolderrequest = handle_sharefolderrequest;