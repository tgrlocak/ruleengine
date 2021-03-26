#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
const { Engine } = require("json-rules-engine");

const engine = new Engine();

engine.addRule({
    conditions: {
        any: [
            {
                fact: "fact",
                operator: "notEqual",
                value: false,
                path: "$.cond1"
            }
        ],
        all: [
            {
                fact: "fact",
                operator: "equal",
                value: true,
                path: "$.cond2",
                all: [
                    {
                        fact: "fact",
                        operator: "equal",
                        value: "ON",
                        path: "$.cond3.cond31"
                    },
                    {
                        fact: "fact",
                        operator: "equal",
                        value: true,
                        path: "$.cond3.cond32"
                    }
                ]
            },
            {
                fact: "fact",
                operator: "equal",
                value: "OFF",
                path: "$.cond5",
                any: [
                    {
                        fact: "fact",
                        operator: "greaterThan",
                        value: 25,
                        path: "$.cond4.cond41"
                    },
                    {
                        fact: "fact",
                        operator: "equal",
                        value: true,
                        path: "$.cond4.cond42"
                    },
                    {
                        fact: "fact",
                        operator: "lessThan",
                        value: 35,
                        path: "$.cond6"
                    }
                ]
            }
        ]
    },
    event : {
        type: "message",
        params: {
            data: "WORKING",
        },
    }
});

engine.on("success", function(event, almanac, result) {
    console.log('>>>SUCCESS: ' + result.toString() + '\n');
});

engine.on("failure", function(event, almanac, result) {
    console.log('>>>FAILED: ' + result.toString() + '\n');
});

amqp.connect('amqp://localhost', function(err, connection) {
    if(err) {
        throw err;
    }

    connection.createChannel(function(err1, channel) {
        if(err1) {
            throw err1;
        }

        var queue = 'vurmak';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());

            var fact = { fact: JSON.parse(msg.content) };
            engine.run(fact);
        }, {
            noAck: true
        });
    });
});