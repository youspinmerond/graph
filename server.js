const http = require('http')
const fs   = require('fs')

const MIME = {
	html:"text/html",
	css:"text/css",
	js:"application/javascript"
}

const sendFile = (fileName, res, type) => {
	let f = fs.readFileSync(__dirname+"/cli/"+fileName, 'utf-8')
	console.log(__dirname+"/cli/"+fileName,)
	res.writeHead(200, 'OK', {
		"Content-Type": type
	})
	console.log(f)
	res.end(f)
}


http.createServer((req,res) => {
	console.log(req.url)
	switch(req.url) {
		case '/':
		case '/index.html':
			return sendFile('index.html', res, MIME.html)
		case '/style.css':
			return sendFile('style.css', res, MIME.css)
		case '/script.js':
			return sendFile('script.js', res, MIME.js)
		default:
			return sendFile('404.html', res, MIME.html)
	}
}).listen(6948, "0.0.0.0", () => console.log('http://localhost:6948'))

