#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
var _ = require('lodash');

function send() {
    amqp.connect('amqp://localhost', function(err, connection) {
        if(err) {
            throw err;
        }

        connection.createChannel(function(err1, channel) {
            if(err1) {
                throw err1;
            }

            var queue = "vurmak";
            var data = _generateData();

            channel.assertQueue(queue, {
                durable: false
            });

            var msg = JSON.stringify(data);

            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
}

function _generateData() {
    var data = 
    {
        cond1: randomBool(),
        cond2: randomBool(),
        cond3: {
            cond31: randomString(),
            cond32: randomBool()
        },
        cond4: {
            cond41: randomInt(),
            cond42: randomBool()
        },
        cond5: randomString(),
        cond6: randomInt()
    };
    return data;
}

function randomBool() {
    return _.sample([true, false]);
}

function randomString() {
    return _.sample(['ON', 'OFF']);
}

function randomInt() {
    return _.sample([10, 20, 30, 40, 50]);
}

send();

setInterval(function() {
    send();
}, 5000);