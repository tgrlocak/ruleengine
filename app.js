const fastify = require("fastify");
const app = fastify();
const { Engine } = require("json-rules-engine");

const factClient = require("./facts");

async function start() {
    const engine = new Engine();
 
    engine.addRule({
        conditions: {
            all: [
                {
                    fact: "facts",
                    operator: "equal",
                    value: "ON",
                    any: [
                        {
                            fact: "facts",
                            operator: "equal",
                            value: "ON",
                            path: "$.sistemFiltreSoklama"
                        }
                    ]
                },
                {
                    fact: "facts",
                    operator: "equal",
                    value: "OFF",
                    path: "$.kompresor_2"
                }
            ],
            any: [
                {
                    fact: "facts",
                    operator: "notEqual",
                    value: "STOP",
                    path: "$.process"
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

    engine.addFact('facts', function(params, almanac) {
        return almanac.factValue('factId').then(factId => {
            return factClient.getFact(factId);
        });
    });  

    const fact1 = { factId: "fact1" };
    engine.run(fact1).then(({ events }) => {
        if (events && events.length > 0 && events.filter(e => e.params != null && e.params.data != null)) {
            console.log(fact1.factId + ' is ' + events.map(event => event.params.data));
        }
    });

    const fact2 = { factId: "fact2" };
    engine.on('failure', function(event, almanac, result) {
        throw Error(fact2.factId + ' is FAILED');
    });

    engine.run(fact2).then(({ events }) => {
        console.log(fact2.factId + ' is ' + events.map(event => event.params.data));
    }).catch((err) => {
        console.log(err.message);
    });

    const fact3 = { factId: "fact3" };
    engine.run(fact3).then(({ events }) => {
        console.log(fact3.factId + ' is ' + events.map(event => event.params.data));
    });

    engine.addFact('nested', function(params, callback) {
        return factClient.getNestedFacts();
    });

}

start()

// app.listen(3000);