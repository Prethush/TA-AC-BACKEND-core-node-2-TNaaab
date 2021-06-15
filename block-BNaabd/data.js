let http = require('http');
const { sensitiveHeaders } = require('http2');
let qs = require('querystring');

let server = http.createServer(handleRequest);

function handleRequest(req, res) {
    let dataFormat = req.headers['content-type'];
    let store = "";

    req.on('data', (chunk) => {
        store += chunk;
    });

    req.on('end', () => {
        if(req.method === 'POST' && req.url === '/json') {
            let parsedData = JSON.parse(store);
            res.setHeader('Content-Type', 'application/json');
            res.end(store);
        }

        if(req.method === 'POST' && req.url === '/form') {
            let parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(parsedData));
        }
    });

   
}

server.listen(7000, () => {
    console.log(`Server listening on port 7000`);
})