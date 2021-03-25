'use strict'

const facts = {
    fact1 : {
        process: "CONTINUE",
        kompresor_1: "OFF",
        kompresor_2: "OFF",
        sistemFiltreSoklama: "ON",
        sistemFiltreCalistirma: "OFF",
        aggrega: {
            yerBesleme: true,
            onBesleme: true
        },
        su: {
            pompaEkranAnahtari: "ON",
            emmeOraniHesabaDahil: true,
            miktar: 50,
            emmeOrani: 90
        }, 
        cimento: {
            kaynatMaCalistirma: "ON"
        },
        katki : {
            redozCalistirma: "ON"
        }
    },
    fact2 : {
        process: "STOP",
        kompresor_1: "OFF",
        kompresor_2: "ON",
        sistemFiltreSoklama: "ON",
        sistemFiltreCalistirma: "OFF",
        aggrega: {
            yerBesleme: true,
            onBesleme: true
        },
        su: {
            pompaEkranAnahtari: "ON",
            emmeOraniHesabaDahil: false,
            miktar: 90,
            emmeOrani: 60
        }, 
        cimento: {
            kaynatmaCalistirma: "ON"
        },
        katki : {
            redozCalistirma: "ON"
        }
    },
    fact3: {
        process: "CONTINUE",
        kompresor_1: "ON",
        kompresor_2: "OFF",
        sistemFiltreSoklama: "ON",
        sistemFiltreCalistirma: "OFF",
        aggrega: {
            yerBesleme: true,
            onBesleme: true
        },
        su: {
            pompaEkranAnahtari: "ON",
            emmeOraniHesabaDahil: true,
            miktar: 20,
            emmeOrani: 10
        }, 
        cimento: {
            kaynatMaCalistirma: "ON"
        },
        katki : {
            redozCalistirma: "ON"
        }
    }
}

const nestedFacts = {
    c_1 : true,
    c_2 : false,
    c_3 : true,
    c_4 : {
        c_41 : "A",
        c_42 : "B"
    },
    c_5 : "C",
    c_6 : {
        c_61 : "D",
        c_62 : "E"
    }
}

module.exports = {
    getFacts: () => {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
              resolve(facts)
            })
        });
    },
    getFact: (factId) => {
        console.log('Reading ' + factId + '...');
        return new Promise((resolve, reject) => {
            setImmediate(() => {
              resolve(facts[factId])
            })
        });
    },
    getNestedFacts: () => {
        return new Promise((resolve, reject) => {
            setImmediate(() => {
                resolve(nestedFacts);
            });
        });
    }
}