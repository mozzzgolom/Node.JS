const readline = require('readline');
const EventEmitter = require('events');
const Timer = require('./timer')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Handler {
    static timer(payload ) {
        Timer.timer(payload)
    }
}

class MyEmitter extends EventEmitter {};
const emitterObject = new MyEmitter();
emitterObject.on('timer', Handler.timer);

rl.question('Введите дату в формате "минуты-час-день-месяц-год" или продолжите для установки таймера на минуту: ',
    (date) => {
    emitterObject.emit('timer', date);
    rl.close();
})