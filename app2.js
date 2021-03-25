var RuleEngine = require("node-rules");

const factClient = require("./facts");

async function start() {
    const engine = new RuleEngine();

    var rule = {
        "condition": function(engine) {
            engine.when(this.kompresor_1 === 'OFF') && engine.when(this.kompresor_2 === 'ON')
        },
        "consequence": function(engine) {
            this.result = false;
            this.reason = "Kompresor1 is OFF and Kompresor2 is ON";
            engine.stop();
        }
    }

    var fact = await factClient.getFact('fact2');

    engine.register(rule);

    engine.execute(fact, function(data) {
        if(data.result) {
            console.log('Valid');
        } else {
            console.log('Blocked reason: ' + data.reason);
        }
    });

}

start()