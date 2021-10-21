const fs = require('fs')
const lazy = require('lazy')
const path = require('path')
const yargs = require('yargs')
const readline = require("readline");
const inquirer = require("inquirer");

const options = yargs
    .usage("Usage: -p <path>")
    .option("p", { alias: "path", describe: "Path to file", type: "string", demandOption: true })
    .argv;

const filePath = path.join(__dirname, options.path);

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

// const question = async (query) => rl.question(query, resolve => resolve) // new Promise(resolve => rl.question(query, resolve) )

const readingFile = (filePath) => {
    if(isFile(filePath)) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Введите шаблон поиска: ", (template) => {
            console.log(template, options.path, filePath)
            const readStream = fs.createReadStream(filePath, {
                encoding: 'utf-8',
            })

            const writeStream = fs.createWriteStream(`${options.path}_${template}_requests.log`, {
                encoding:'utf8',
                flags: 'a'
            });

            new lazy(readStream)
                .lines
                .forEach(function(line) {
                    let result = String(line).match(template)
                    if(result !== null) {
                        writeStream.write(line)
                        writeStream.write('\n')
                    }
                })

            rl.close();
        });

    } else {
        console.log('no')
        const list = fs.readdirSync(filePath)
        inquirer
            .prompt([{
                name: "fileName",
                type: "list",
                message: "Choose file:",
                choices: list,
            }])
            .then((answer) => {
                console.log(answer.fileName);
                readingFile(filePath + '/' + answer.fileName)
            });
    }
}
readingFile(filePath)
