var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var listdir = require('./services/listdir');
var starfile = require('./services/starfile');
var register = require('./services/register');
var folderupload = require('./services/folderupload');
var sharefolder = require('./services/sharefolder');
var deletefile = require('./services/deletefile');
var listfiles = require('./services/listfiles');
var userdetails = require('./services/userdetails');
var edituserdetails = require('./services/edituserdetails');
var fileupload = require('./services/fileupload');
var topic_namelogin = 'login_topic';
var consumer_login = connection.getConsumer(topic_namelogin);
var producer = connection.getProducer();

console.log('server is running');
consumer_login.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_loginrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_nameregister = 'register_topic';
var consumer_register = connection.getConsumer(topic_nameregister);

console.log('server is running');
consumer_register.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    register.handle_registerrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_namelistdir = 'listdir_topic';
var consumer_listdir = connection.getConsumer(topic_namelistdir);
console.log('server is running');
consumer_listdir.on('message', function (message) {
    console.log('listdir message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    listdir.handle_listdirrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        console.log("its payload in server"+payloads.topic);
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_fileupload = 'fileupload_topic';
var consumer_fileupload = connection.getConsumer(topic_fileupload);
console.log('server is running');
consumer_fileupload.on('message', function (message) {
    console.log('listdir message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    fileupload.handle_fileuploadrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        console.log("its payload in server"+payloads.topic);
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_namefolderupload = 'folderupload_topic';
var consumer_folderupload = connection.getConsumer(topic_namefolderupload);
console.log('server is running');
consumer_folderupload.on('message', function (message) {
    console.log('folderupload message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    folderupload.handle_folderuploadrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_namelistfiles = 'listfiles_topic';
var consumer_listfiles = connection.getConsumer(topic_namelistfiles);
console.log('server is running');
consumer_listfiles.on('message', function (message) {
    console.log('folderupload message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    listfiles.handle_listfilesrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_nameuserdetails = 'userdetails_topic';
var consumer_userdetails = connection.getConsumer(topic_nameuserdetails);
console.log('server is running');
consumer_userdetails.on('message', function (message) {
    console.log('userdetails message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    userdetails.handle_userdetailsrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_nameedituserdetails = 'edituserdetails_topic';
var consumer_edituserdetails = connection.getConsumer(topic_nameedituserdetails);
console.log('server is running');
consumer_edituserdetails.on('message', function (message) {
    console.log('edituserdetails message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    edituserdetails.handle_edituserdetailsrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_namesharefolder = 'sharefolder_topic';
var consumer_sharefolder = connection.getConsumer(topic_namesharefolder);
console.log('server is running');
consumer_sharefolder.on('message', function (message) {
    console.log('folderupload message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    sharefolder.handle_sharefolderrequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});

var topic_namedeletefile = 'deletefile_topic';
var consumer_deletefile = connection.getConsumer(topic_namedeletefile);
console.log('server is running');
consumer_deletefile.on('message', function (message) {
    console.log('folderupload message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    deletefile.handle_deletefilerequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});
var topic_namestarfile = 'starfile_topic';
var consumer_starfile = connection.getConsumer(topic_namestarfile);
console.log('server is running');
consumer_starfile.on('message', function (message) {
    console.log('folderupload message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    starfile.handle_starfilerequest(data.data, function(err,res){
        console.log('after handle'+res);
        var payloads = [
            { topic: data.replyTo,
                messages:JSON.stringify({
                    correlationId:data.correlationId,
                    data : res
                }),
                partition : 0
            }
        ];
        producer.send(payloads, function(err, data){
            console.log(data);
        });
        return;
    });
});