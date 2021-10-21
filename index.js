const fs = require('fs')
const lazy = require('lazy')

const readStream = fs.createReadStream('./access.log', {
    encoding: 'utf-8',
})

const writeStream = fs.createWriteStream(`./89.123.1.41_requests.log`, {
    encoding:'utf8',
    flags: 'a'
});
const writeStream2 = fs.createWriteStream(`./34.48.240.111_requests.log`, {
    encoding:'utf8',
    flags: 'a'
});

new lazy(readStream)
    .lines
    .forEach(function(line) {
        let result = String(line).match(/89.123.1.41/)
        let result2 = String(line).match(/34.48.240.111/)
        if(result !== null) {
            writeStream.write(line)
            writeStream.write('\n')
        }
        if(result2 !== null) {
            writeStream2.write(line)
            writeStream2.write('\n')
        }
    })