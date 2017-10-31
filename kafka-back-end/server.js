var connection =  new require('./kafka/Connection');
var login = require('./services/login');
var listdir = require('./services/listdir');


var topic_name = 'login_topic';
var consumer = connection.getConsumer(topic_name);
var producer = connection.getProducer();

console.log('server is running');
consumer.on('message', function (message) {
    console.log('message received');
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    login.handle_request(data.data, function(err,res){
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

var topic_name = 'listdir_topic';
var consumer_listdir = connection.getConsumer(topic_name);


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

