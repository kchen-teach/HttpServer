const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const port = process.env.port || 3000

const webPath = 'public'

// 建立一個 HttpServer
// req: 從 Client 端發出的請求
// res: 由 Server 回傳給 Client 的訊息
const server = http.createServer((req, res) => {
    console.log('有人連線進來')


    let urlPath = url.parse(req.url)

    console.log('url:' + req.url)

    let pathName = urlPath.pathname

    // 判斷是否為預設路徑
    if (pathName == '/' || pathName == '/index.htm') {
        pathName = '/index.html'
    }

    // 組合成本機端的檔案路徑 
    let filePath = path.join(__dirname, webPath, pathName)
    console.log('filePath:' + filePath)


    let header = {
        'Accept-Charset': 'utf-8',
        'Accept-Language': 'zh-TW',
        'Content-Type': 'text/html'
    }

    fs.readFile(filePath, 'utf8', (error, data) => {
        // 判斷讀檔是否出錯
        if (error) {
            console.log(filePath + '檔案不存在')
            res.writeHead(404, header)
            res.write('<h1>404 找不到檔案</h1>')
            res.end()
            return
        }
        res.writeHead(200, header)
        res.write(data)
        res.end()

    })

})

server.listen(port)
console.log('Server running at http://127.0.0.1:' + port)
