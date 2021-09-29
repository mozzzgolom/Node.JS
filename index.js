const colors = require('colors')
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите первое число: ', (one) => {
    rl.question('Введите второе число ', (two) => {
        console.log(isNaN(one), isNaN(two))
        console.log(typeof one, typeof two)
        if(isNaN(one) || isNaN(two)) {
            console.log(colors.red("Не диапазон чисел"))
        } else {
            if(+first > +two) {
                console.log(colors.red("Первое число больше второго"))
            } else {
                console.log(colors.green(`Ваш диапазон чисел: ${one} - ${two}`));
                let result = 0, colorId = 0, arr = []
                for(let i = one; i <= two; i++) {
                    for(let j = 2; j < i; j++) {
                        result = i / j % 1
                        if(result === 0) {
                            break
                        }
                    }
                    if(result !== 0 || i === 2) {
                        ++colorId
                        switch (colorId) {
                            case 1:
                                arr.push(colors.green(i))
                                break
                            case 2:
                                arr.push(colors.yellow(i))
                                break
                            case 3:
                                arr.push(colors.red(i))
                                break
                        }
                        if(colorId === 3) colorId = 0
                    }
                }
                if (arr.length < 1) {
                    console.log(colors.red("В указанном диапазоне нет простых чисел"))
                } else {
                    console.log(...arr)
                }

            }
        }
        rl.close();
    });
});