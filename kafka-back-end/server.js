var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var listdir = require('./services/listdir');
var register = require('./services/register');
var folderupload = require('./services/folderupload');
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
