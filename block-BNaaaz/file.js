let http = require('http');
let fs = require('fs');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})