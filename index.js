const fs = require('fs')
const path = require('path')
const http = require('http')

const server = http.createServer(((req, res) => {
    const filePath = path.join(__dirname);
    let currentPath = ''
    if(req.url === '/') {
         currentPath = filePath
    } else {
         currentPath = req.url.replace(/%20/, " ")
    }
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
    //console.log(filePath)
    const isFile = fileName => {
        return fs.lstatSync(fileName).isFile();
    }
    if(req.method === 'GET' && req.url !== '/favicon.ico') {
         console.log("req.url: ", req.url, path.basename(req.url), path.join(__dirname))

        if(isFile(currentPath)) {
            console.log('yes this is file')
            let readStream  = fs.createReadStream(currentPath, {
                encoding: 'utf-8',
            })
            readStream.on('data', chunk => {
                console.log(chunk)
                data += chunk
            })
            let data = ''
            readStream.on('end', () => {
                res.write(`<ul><li><a href="${filePath}">Главная страница</a></li></ul><p>${data}</p>`)
                res.end()
            })
        } else {
            const list = fs.readdirSync(currentPath)
            const result = list.map(item => {
                let href = currentPath + "/" + item
                item = `<li><a href="${href}">${item}</a></li>`
                return item
            })
            res.write(`<ul><li><a href="${filePath}">Главная страница</a></li>${result.join('')}</ul>`, 'utf-8')
            res.end()
        }
    }
}))

server.listen(8888)