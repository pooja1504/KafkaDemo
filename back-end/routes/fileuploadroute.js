// new code here
var express = require('express');
var router = express.Router();
var multer = require('multer');
var glob = require('glob');
var mv = require('mv');
var kafka = require('./kafka/client');


var Router = require('router');
var router = Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../kafka-back-end/uploads/'+req.session.username);
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null,file.originalname);
    }
});

var upload = multer({storage:storage});
router.post('/upload', upload.single('mypic'), function (req, res, next) {

    var fileName = req.file.filename;
    var filePath= '../kafka-back-end/uploads/'+req.session.username+'/'+req.file.filename;

    kafka.make_request('fileupload_topic',{"username":req.session.username,"fileName":fileName,"filePath":filePath,"star":"false"}, function(err,results){
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
});


module.exports = router;


