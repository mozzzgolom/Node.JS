const moment = require('moment');
require('moment-precise-range-plugin');
const colors = require('colors')
let date
module.exports.timer = (payload) => {
    if(payload.length < 1){
        date = moment().add(1, 'minutes')
    } else {
        date = payload
    }
    if(moment() > moment(date,"mm-HH-DD-MM-YYYY")) {
        console.log(colors.red("ОШИБКА! Вы ввели дату из прошлого!"))
    }else {
        const timer = setInterval(()=>{
            console.clear()
            let {seconds, minutes, hours, days, months, years} = moment.preciseDiff(moment(), moment(date, "mm-HH-DD-MM-YYYY"), true)
            if(moment() < moment(date,"mm-HH-DD-MM-YYYY")) {
                console.log(colors.yellow('ss:mm:hh DD-MM-YYYY'))
                console.log(colors.green(`${seconds}:${minutes}:${hours} ${days}-${months}-${years}`))
            } else {
                console.log("Время вышло!")
                clearInterval(timer)
            }
        }, 1000)
    }
}